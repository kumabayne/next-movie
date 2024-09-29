import Image from "next/image";
import { Movie } from "../types/movie";
import { TVShow } from "../types/tv";
import Rating from "./Rating";
import { configuration } from "../utils/data";
import { FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Credit({ credit }: { credit: Movie | TVShow }) {
  const year = (
    "release_date" in credit ? credit.release_date : credit.first_air_date || ""
  ).substring(0, 4);

  return (
    <Link
      href={`/${credit.media_type}/${credit.id}`}
      className="border gap-2 grid grid-cols-credits items-center mb-2 p-2 rounded"
    >
      {credit.poster_path ? (
        <Image
          className="rounded-sm"
          src={`${
            configuration.images.secure_base_url
          }${`${configuration.images.poster_sizes[1]}${credit.poster_path}`}`}
          alt={"title" in credit ? credit.title : credit.name}
          width="48"
          height="72"
          loading="lazy"
        />
      ) : (
        <div className="bg-zinc-700/40 border border-zinc-800 flex h-[72px] items-center justify-center rounded-sm text-zinc-500 w-12">
          {credit.media_type === "movie" ? (
            <FilmIcon className="h-5 w-6" />
          ) : (
            <TvIcon className="h-5 w-6" />
          )}
        </div>
      )}
      <div>
        <h3 className="font-semibold leading-tight line-clamp-1 text-sm text-zinc-200">
          {"title" in credit ? credit.title : credit.name}
        </h3>
        <p className="leading-tight line-clamp-2 text-sm text-zinc-400">
          {credit.character}
          {"episode_count" in credit && (
            <>
              {credit.character && <span className="font-semibold"> · </span>}
              <span>{`(${credit.episode_count} ${
                typeof credit.episode_count === "number" &&
                credit.episode_count > 1
                  ? "episodes"
                  : "episode"
              })`}</span>
            </>
          )}
        </p>
        <div className="flex justify-between items-center">
          <Rating rating={credit.vote_average} />
          <p className="text-sm text-zinc-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}
