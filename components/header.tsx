import Container from "./container";
import HamburgerMenu from "./hamburger-menu";
import Search from "./search";
import Logo from "./logo";
import Link from "next/link";
import { Snail } from "lucide-react";
import Navigation from "./navigation";
import LoginDialog from "./login-dialog";
import { auth } from "@/auth";
import ProfileMenu from "./profile-menu";

export default async function Header() {
  const session = await auth();

  return (
    <header className="absolute left-0 right-0 top-2 z-50 xl:static xl:py-3">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <div className="xl:hidden">
            <HamburgerMenu />
          </div>
          <div className="flex items-center gap-6">
            <Link className="hidden p-2 xl:block" href="/">
              <Snail />
            </Link>
            <div className="hidden xl:block">
              <Navigation />
            </div>
          </div>
          <div className="hidden xl:block">
            {session ? (
              <ProfileMenu
                fallback={session.user?.name?.charAt(0) || "a"}
                src={session?.user?.image || ""}
              />
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
      </Container>
      {/* <Container className="space-y-2">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <HamburgerMenu />
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <Search />
          </div>
        </div>
      </Container> */}
    </header>
  );
}
