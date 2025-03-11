import { Button } from "@/components/ui/button";
import Container from "./container";
import HamburgerMenu from "./hamburger-menu";
import Search from "./search";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="bg-background py-2">
      <Container className="space-y-2">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <HamburgerMenu />
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <Search />
            <Button>Sign In</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
