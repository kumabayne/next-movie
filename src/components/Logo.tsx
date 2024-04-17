import Link from "next/link";
import { TicketIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="sr-only">Movie App</h1>
      <TicketIcon className="h-6 text-pink-500 w-6" />
    </Link>
  );
}
