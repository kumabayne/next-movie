import clsx from "clsx";
import { Genre } from "../types/genre";
import Link from "next/link";

export default function GenreCard({ item }: { item: Genre }) {
  return (
    <Link
      className={clsx(
        "bg-orange-300 flex-col inline-flex items-center min-w-16 p-1 rounded text-orange-900",
        { "p-2": item.Icon }
      )}
      href={`/genre/${item.id}-${item.name}/movie/1`}
    >
      {item.Icon && <item.Icon />}
      <p className="font-medium text-sm whitespace-nowrap">{item.name}</p>
    </Link>
  );
}
