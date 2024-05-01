import Link from "next/link";
import { TicketIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <Link className="flex gap-2 shrink-0 items-center" href="/">
      <TicketIcon className="h-6 text-pink-500 w-6" />
      <h1 className="hidden sm:block text-sm text-zinc-100 font-semibold">
        Film Snail
      </h1>
    </Link>
  );
}
