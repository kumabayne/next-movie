import Image from "next/image";
import { MovieType } from "../types/movie";
import { configuration } from "../utils/data";
import { PersonType } from "../types/people";
import { formatDate } from "@/utils/helpers";
import { TVShow } from "../types/tv";
import Link from "next/link";
import { IconDeviceTvOld, IconMovie, IconUser } from "@tabler/icons-react";

export default function SearchResult({
  item,
  handleClick,
  type,
}: {
  item: MovieType | TVShow | PersonType;
  handleClick?: () => void;
  type?: string;
}) {
  const alt = "title" in item ? item.title : item.name;
  const date =
    "release_date" in item && item.release_date
      ? formatDate(item.release_date)
      : "first_air_date" in item && item.first_air_date
        ? formatDate(item.first_air_date)
        : "known_for_department" in item && item.known_for_department
          ? item.known_for_department
          : "";
  const href = `/${item.media_type || type}/${item.id}`;
  const src =
    "poster_path" in item && item.poster_path
      ? `${configuration.images.poster_sizes[1]}${item.poster_path}`
      : "profile_path" in item && item.profile_path
        ? `${configuration.images.profile_sizes[1]}${item.profile_path}`
        : "";
  const title = "title" in item ? item.title : item.name;

  return (
    <Link
      className="grid grid-cols-search items-center gap-2"
      href={href}
      {...(handleClick ? { onClick: handleClick } : {})}
    >
      {src && (
        <Image
          className="rounded-sm"
          src={`${configuration.images.secure_base_url}${src}`}
          alt={alt}
          width="67"
          height="100"
          loading="lazy"
        />
      )}
      {!src && (
        <div className="flex h-[100px] w-[67px] items-center justify-center rounded-sm bg-zinc-200 text-zinc-400">
          {item.media_type === "movie" && (
            <IconMovie className="h-6 w-6" data-testid="avatar" stroke="1.5" />
          )}
          {item.media_type === "person" && (
            <IconUser className="h-6 w-6" data-testid="avatar" stroke="1.5" />
          )}
          {item.media_type === "tv" && (
            <IconDeviceTvOld
              className="h-6 w-6"
              data-testid="avatar"
              stroke="1.5"
            />
          )}
        </div>
      )}
      <div>
        <div className="mb-0.5">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs font-semibold text-zinc-500">{date}</p>
        </div>
        <p
          data-testid="overview-known_for"
          className="line-clamp-2 text-sm text-zinc-500"
        >
          {"overview" in item
            ? item.overview
            : item.known_for?.reduce(
                (prev, current) =>
                  prev.length > 0
                    ? `${prev} · ${
                        "title" in current ? current.title : current.name
                      }`
                    : "title" in current
                      ? current.title
                      : current.name,
                "",
              )}
        </p>
      </div>
    </Link>
  );
}
