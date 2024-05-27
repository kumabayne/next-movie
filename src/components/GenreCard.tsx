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
        "bg-orange-300/10 flex-col inline-flex items-center min-w-16 p-1 rounded text-orange-300 md:flex-row md:gap-1",
        media && "md:bg-transparent md:text-orange-400 md:p-0",
        { "p-2": item.Icon }
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
