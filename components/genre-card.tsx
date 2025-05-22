import clsx from "clsx";
import { GenreType } from "../types/genre";
import Link from "next/link";

export default function GenreCard({
  item,
  media,
}: {
  item: GenreType;
  media: boolean;
}) {
  return (
    <Link
      className={clsx(
        "inline-flex flex-col rounded border border-white/10 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-4 py-2 text-white",
        {
          "min-w-16 items-center p-2": item.Icon,
        },
      )}
      href={`/genre/${item.id}-${item.name}/movie/1`}
    >
      {item.Icon && (
        <item.Icon
          className="h-5 w-5"
          data-testid="genrecard-icon"
          stroke="1.5"
        />
      )}
      <p
        className={clsx(
          "whitespace-nowrap text-sm font-medium",
          !media && "md:text-base",
        )}
      >
        {item.name}
      </p>
    </Link>
  );
}
