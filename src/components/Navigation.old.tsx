import Link from "next/link";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import Container from "./Container";

export default function Navigation() {
  return (
    <nav className="fixed py-4 top-0 w-full">
      <Container>
        <div className="flex gap-6 items-center">
          <Link href="/">
            <CircleStackIcon className="h-6 text-emerald-400 w-6" />
          </Link>
          <ul className="flex font-medium gap-6 leading-none text-sm text-white">
            <li>
              <Link
                className="border-b-2 border-transparent hover:border-emerald-400"
                href="/movies"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                className="border-b-2 border-transparent hover:border-emerald-400"
                href="/tv-shows"
              >
                TV Shows
              </Link>
            </li>
            <li>
              <Link
                className="border-b-2 border-transparent hover:border-emerald-400"
                href="/actors"
              >
                Actors
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
