import {
  FilmIcon,
  MagnifyingGlassIcon,
  TvIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const navData = [
  {
    id: 1,
    href: "/movies",
    text: "Movies",
    icon: FilmIcon,
  },
  {
    id: 2,
    href: "tv-shows",
    text: "TV Shows",
    icon: TvIcon,
  },
  {
    id: 3,
    href: "/people",
    text: "People",
    icon: UsersIcon,
  },
  {
    id: 4,
    href: "/search",
    text: "Search",
    icon: MagnifyingGlassIcon,
  },
  {
    id: 5,
    href: "/profile",
    text: "Profile",
    icon: UserCircleIcon,
  },
];

export default function MobileNav() {
  return (
    <nav className="p-2 lg:h-full lg:py-4 lg:px-0">
      <ul className="grid grid-cols-5 gap-2 text-center text-xs lg:grid-cols-1 lg:h-full lg:grid-rows-[auto_auto_auto_1fr] lg:gap-4 lg:text-base lg:text-left">
        {navData.map((item) => (
          <li key={item.id}>
            <Link
              className="inline-flex flex-col items-center gap-1 lg:flex-row lg:gap-2 text-cyan-400 hover:text-cyan-200 transition-colors ease-in-out duration-300"
              href={item.href}
            >
              <item.icon className="w-5 h-5 lg:h-6 lg:w-6" />
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
