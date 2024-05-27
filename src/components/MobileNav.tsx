import {
  FilmIcon,
  TvIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function MobileNav() {
  return (
    <nav className="text-zinc-500 p-2">
      <ul className="grid grid-cols-4 gap-2 text-center text-xs">
        <li>
          <Link className="flex flex-col items-center gap-1" href="">
            <FilmIcon className="w-5 h-5" />
            Movies
          </Link>
        </li>
        <li>
          <Link className="flex flex-col items-center gap-1" href="">
            <TvIcon className="w-5 h-5" />
            TV Shows
          </Link>
        </li>
        <li>
          <Link className="flex flex-col items-center gap-1" href="">
            <UsersIcon className="w-5 h-5" />
            People
          </Link>
        </li>
        <li>
          <Link className="flex flex-col items-center gap-1" href="">
            <UserCircleIcon className="w-5 h-5" />
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
