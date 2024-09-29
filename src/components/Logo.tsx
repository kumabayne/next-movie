import Link from "next/link";
import { SnailIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link className="flex gap-2 shrink-0 items-center" href="/">
      <SnailIcon className="h-6 text-white w-6" />
      <h1 className="hidden sm:block text-sm text-zinc-100 font-semibold">
        Film Snail
      </h1>
    </Link>
  );
}
