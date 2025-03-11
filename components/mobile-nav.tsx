import {
  AirplayIcon,
  CircleUserIcon,
  FilmIcon,
  HomeIcon,
  TvIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background p-2">
      <ul className="grid grid-cols-5">
        <li className="flex justify-center">
          <Link
            className="inline-flex flex-col items-center text-primary"
            href="/"
          >
            <HomeIcon strokeWidth="1.5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link
            className="inline-flex flex-col items-center text-primary"
            href="/movies"
          >
            <FilmIcon strokeWidth="1.5" />
            <span className="text-xs font-medium">Movies</span>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link
            className="inline-flex flex-col items-center text-primary"
            href="/tv"
          >
            <TvIcon strokeWidth="1.5" />
            <span className="text-xs font-medium">TV</span>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link
            className="inline-flex flex-col items-center text-primary"
            href="/people"
          >
            <UsersIcon strokeWidth="1.5" />
            <span className="text-xs font-medium">People</span>
          </Link>
        </li>
        <li className="flex justify-center">
          <Link
            className="inline-flex flex-col items-center text-primary"
            href="/profile"
          >
            <CircleUserIcon strokeWidth="1.5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
