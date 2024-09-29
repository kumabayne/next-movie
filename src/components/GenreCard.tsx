import clsx from "clsx";
import { Genre } from "../types/genre";
import Link from "next/link";

export default function GenreCard({
  item,
  media,
}: {
  item: Genre;
  media: boolean;
}) {
  return (
    <Link
      className={clsx(
        "inline-flex px-2 py-1 rounded bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white border border-white/10",
        {
          "p-2 min-w-16 items-center gap-1": item.Icon,
        }
      )}
      href={`/genre/${item.id}-${item.name}/movie/1`}
    >
      {item.Icon && <item.Icon className="md:w-5 md:h-5" />}
      <p
        className={clsx(
          "font-medium text-sm whitespace-nowrap ",
          !media && "md:text-base"
        )}
      >
        {item.name}
      </p>
    </Link>
  );
}
