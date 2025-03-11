import Link from "next/link";
import { SnailIcon } from "lucide-react";

export default function Logo() {
  return (
    <Link className="light:bg-black flex shrink-0 items-center gap-2" href="/">
      <SnailIcon className="h-6 w-6 text-white" />
      <h1 className="hidden text-sm font-semibold text-zinc-100 sm:block">
        Film Snail
      </h1>
    </Link>
  );
}
