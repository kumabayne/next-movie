import Image from "next/image";
import { MovieType } from "../types/movie";
import { TVShow } from "../types/tv";
import Rating from "./rating";
import { configuration } from "../utils/data";
import Link from "next/link";
import { IconDeviceTvOld, IconMovie } from "@tabler/icons-react";

export default function Credit({ credit }: { credit: MovieType | TVShow }) {
  const year = (
    "release_date" in credit ? credit.release_date : credit.first_air_date || ""
  ).substring(0, 4);

  return (
    <Link
      href={`/${credit.media_type}/${credit.id}`}
      className="mb-2 grid grid-cols-credits items-center gap-2 rounded border p-2"
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
        <div className="flex h-[72px] w-12 items-center justify-center rounded-sm border border-zinc-800 bg-zinc-700/40 text-zinc-500">
          {credit.media_type === "movie" ? (
            <IconMovie className="h-5 w-6" />
          ) : (
            <IconDeviceTvOld className="h-5 w-6" />
          )}
        </div>
      )}
      <div>
        <h3 className="line-clamp-1 text-sm font-semibold leading-tight text-zinc-200">
          {"title" in credit ? credit.title : credit.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-tight text-zinc-400">
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
        <div className="flex items-center justify-between">
          <Rating rating={credit.vote_average} />
          <p className="text-sm text-zinc-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}
