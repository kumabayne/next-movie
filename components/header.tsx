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
    <header className="lg:rounded-full lg:border lg:border-black/10 lg:bg-black/50 lg:p-2 lg:drop-shadow lg:backdrop-blur-sm">
      <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="flex items-center gap-6">
          <Link className="hidden rounded-full p-2 lg:block" href="/">
            <Snail />
          </Link>
          <div className="hidden lg:block">
            <Navigation />
          </div>
        </div>
        <div className="hidden lg:block">
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
    </header>
  );
}
