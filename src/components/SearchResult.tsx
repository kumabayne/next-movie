import Image from "next/image";
import { Movie } from "../types/movie";
import { configuration } from "../utils/data";
import { Person } from "../types/people";
import { formatDate } from "../utils/helpers";
import { TVShow } from "../types/tv";
import Link from "next/link";
import { TbUserFilled } from "react-icons/tb";

export default function SearchResult({
  item,
  type,
}: {
  item: Movie | TVShow | Person;
  type?: string;
}) {
  return (
    <Link
      href={`/${item.media_type || type}/${item.id}`}
      className="gap-2 grid grid-cols-search items-center"
    >
      {(("profile_path" in item && item.profile_path) ||
        ("poster_path" in item && item.poster_path)) && (
        <Image
          className="rounded-sm"
          src={`${configuration.images.secure_base_url}${
            "poster_path" in item
              ? `${configuration.images.poster_sizes[1]}${item.poster_path}`
              : `${configuration.images.profile_sizes[1]}${item.profile_path}`
          }`}
          alt={"title" in item ? item.title : item.name}
          width="67"
          height="100"
          loading="lazy"
        />
      )}
      {(("profile_path" in item && !item.profile_path) ||
        ("poster_path" in item && !item.poster_path)) && (
        <div className="bg-zinc-700/40 border border-zinc-800 flex h-[100px] items-center justify-center w-[67px] rounded-sm">
          <TbUserFilled
            data-testid="avatar"
            className="h-10 text-zinc-500/80 w-10"
          />
        </div>
      )}
      <div>
        <div className="mb-0.5">
          <h3 className="font-medium text-sm text-zinc-200">
            {"title" in item ? item.title : item.name}
          </h3>
          <p className="font-semibold text-xs text-zinc-400">
            {"release_date" in item
              ? formatDate(item.release_date)
              : "first_air_date" in item && item.first_air_date !== undefined
              ? formatDate(item.first_air_date)
              : "known_for_department" in item && item.known_for_department}
          </p>
        </div>
        <p
          data-testid="overview-known_for"
          className="line-clamp-2 text-xs text-zinc-400"
        >
          {"overview" in item
            ? item.overview
            : item.known_for.reduce(
                (prev, current) =>
                  prev.length > 0
                    ? `${prev} · ${
                        "title" in current ? current.title : current.name
                      }`
                    : "title" in current
                    ? current.title
                    : current.name,
                ""
              )}
        </p>
      </div>
    </Link>
  );
}
