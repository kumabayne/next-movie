import Link from "next/link";
import { arrayRange } from "@/utils/helpers";
import clsx from "clsx";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

export default function Pagination({
  genre,
  page,
  total_pages,
  type,
}: {
  genre: string;
  page: string;
  total_pages: number;
  type: string;
}) {
  const pageNumber = Number(page);
  // total pages = 500
  // pageNumber = 499
  // if pagenumber + 2 > total_pages, start = total_pages - 4
  const start =
    total_pages < 5
      ? 1
      : pageNumber + 2 > total_pages
      ? total_pages - 4
      : pageNumber - 2 > 0
      ? pageNumber - 2
      : 1;
  const stop =
    total_pages < 5
      ? total_pages
      : start + 4 > total_pages
      ? total_pages
      : start + 4;

  const pageNumbers = arrayRange(start, stop, 1);

  return (
    <div className="text-zinc-500 flex items-center gap-2">
      <Link aria-disabled={pageNumber === 1} href={`/genre/${genre}/${type}/1`}>
        <IconChevronsLeft className="h-4 w-4" />
      </Link>
      <Link
        aria-disabled={pageNumber === 1}
        href={`/genre/${genre}/${type}/${pageNumber - 1}`}
      >
        <IconChevronLeft className="h-4 w-4" />
      </Link>
      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={`/genre/${genre}/${type}/${page}`}
          className={clsx(
            "p-1",
            page === pageNumber && "text-pink-400",
            page !== pageNumber && "text-zinc-500"
          )}
        >
          {page}
        </Link>
      ))}
      <Link
        className={clsx(pageNumber + 1 > total_pages && "pointer-events-none")}
        href={`/genre/${genre}/${type}/${pageNumber + 1}`}
      >
        <IconChevronRight className="h-4 w-4" />
      </Link>
      <Link
        aria-disabled={pageNumber === total_pages}
        href={`/genre/${genre}/${type}/${total_pages}`}
      >
        <IconChevronsRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
