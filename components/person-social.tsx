import { type ExternalIds } from "@/types/people";
import { IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import Link from "next/link";

export default function PersonSocial({
  data,
}: {
  data: ExternalIds | null | undefined;
}) {
  return (
    <div className="flex items-center gap-2">
      {data?.imdb_id && (
        <Link
          className="text-sm font-bold tracking-tighter text-amber-400"
          href={`https://www.imdb.com/name/${data.imdb_id}`}
          target="_blank"
        >
          IMDb
        </Link>
      )}
      {data?.instagram_id && (
        <Link
          href={`https://www.instagram.com/${data.instagram_id}`}
          target="_blank"
        >
          <span className="sr-only">Instagram</span>
          <IconBrandInstagram className="h-6 w-6" strokeWidth="1.5" />
        </Link>
      )}
      {data?.twitter_id && (
        <Link href={`https://www.x.com/${data.twitter_id}`} target="_blank">
          <span className="sr-only">X</span>
          <IconBrandX className="h-6 w-6" strokeWidth="1.5" />
        </Link>
      )}
    </div>
  );
}
