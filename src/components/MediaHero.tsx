"use client";

import Image from "next/image";
import { configuration } from "../utils/data";
import { MovieDetails } from "../types/movie";
import Rating from "./Rating";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { TVShowDetails } from "../types/tv";
import Container from "./Container";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Watchlist from "./Watchlist";
import Favorite from "./Favorite";
import GenreRow from "./GenreRow";

export default function MediaHero({
  data,
}: {
  data: MovieDetails | TVShowDetails;
}) {
  const trailers = data.videos.results.filter(
    (video) => video.type === "Trailer"
  );
  const rating =
    "release_dates" in data
      ? data.release_dates.results
          .filter((item) => item.iso_3166_1 === "US")[0]
          ?.release_dates.reduce(
            (prev, current) =>
              prev === "" ? prev + current.certification : prev,
            ""
          )
      : "";
  const year = "release_date" in data ? data.release_date.slice(0, 4) : "";

  return (
    <>
      <div className="relative">
        <Image
          className="mb-4 md:rounded-none lg:max-h-[600px] object-cover"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${data.backdrop_path}`}
          alt={"title" in data ? data.title : data.name}
          width="1920"
          height="1080"
          priority
        />
        {trailers.length > 0 && (
          <Dialog>
            <DialogTrigger className="block absolute top-1/2 left-1/2 text-sm text-white hover:text-white/90 focus:text-white/90 transition-colors ease-in-out duration-300 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
              <PlayCircleIcon className="h-12 w-12" />
            </DialogTrigger>
            <DialogContent className="max-w-[90%]">
              <iframe
                className="aspect-video h-full w-full"
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Container className="absolute bottom-0 z-20">
        <div className="grid gap-2 grid-cols-[80px_auto] items-end sm:grid-cols-[180px_auto] xl:grid-cols-[240px_auto] md:gap-4 lg:gap-6">
          <div className="relative">
            <Image
              className="rounded-sm md:rounded-md drop-shadow"
              src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${data.poster_path}`}
              alt={"title" in data ? data.title : data.name}
              width="256"
              height="384"
              loading="lazy"
            />
            {data.vote_average > 0 && (
              <div className="absolute top-2 right-2">
                <Rating rating={data.vote_average} />
              </div>
            )}
          </div>
          <div>
            <h1 className="font-semibold text-white text-lg md:text-3xl md:font-bold md:mb-2">
              {"title" in data ? data.title : data.name}
            </h1>
            <div className="flex gap-2 items-center text-sm text-zinc-500 md:mb-2">
              <span className="bg-zinc-100 font-semibold inline-flex items-center justify-center px-1 rounded-sm text-zinc-800 text-xs">
                {rating || "NR"}
              </span>
              {year && (
                <>
                  <span className="font-semibold">&middot;</span>
                  <span>{year}</span>
                </>
              )}
              {"runtime" in data && (
                <>
                  <span className="font-semibold">&middot;</span>
                  {data.runtime > 0 ? (
                    <span>{data.runtime}m</span>
                  ) : (
                    <span>Runtime: Unknown</span>
                  )}
                </>
              )}
            </div>
            <div className="hidden md:flex md:gap-2 md:mb-2">
              <Watchlist />
              <Favorite />
            </div>
            <div className="hidden md:block">
              <GenreRow genres={data.genres} media={true} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
