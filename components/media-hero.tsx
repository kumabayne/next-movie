"use client";

import Image from "next/image";
import { configuration } from "@/utils/data";
import { MovieDetails } from "../types/movie";
import Rating from "./rating";
import { TVShowDetails } from "../types/tv";
import Container from "./container";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Watchlist from "./watchlist";
import Favorite from "./favorite";
import GenreRow from "./genre-row";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function MediaHero({
  data,
}: {
  data: MovieDetails | TVShowDetails;
}) {
  const trailers = data.videos.results.filter(
    (video) => video.type === "Trailer",
  );
  const rating =
    "release_dates" in data
      ? data.release_dates.results
          .filter((item) => item.iso_3166_1 === "US")[0]
          ?.release_dates.reduce(
            (prev, current) =>
              prev === "" ? prev + current.certification : prev,
            "",
          )
      : "";
  const year = "release_date" in data ? data.release_date.slice(0, 4) : "";

  return (
    <>
      <div className="relative">
        <Image
          className="mb-4 object-cover md:rounded-none lg:max-h-[600px]"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${data.backdrop_path}`}
          alt={"title" in data ? data.title : data.name}
          width="1920"
          height="1080"
          priority
        />
        {trailers.length > 0 && (
          <Dialog>
            <DialogTrigger className="absolute left-1/2 top-1/2 z-20 block -translate-x-1/2 -translate-y-1/2 rounded-full text-sm text-white transition-colors duration-300 ease-in-out hover:text-white/90 focus:text-white/90">
              <IconPlayerPlayFilled className="h-12 w-12" />
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
        <div className="grid grid-cols-[80px_auto] items-end gap-2 sm:grid-cols-[180px_auto] md:gap-4 lg:gap-6 xl:grid-cols-[240px_auto]">
          <div className="relative">
            <Image
              className="rounded-sm drop-shadow md:rounded-md"
              src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${data.poster_path}`}
              alt={"title" in data ? data.title : data.name}
              width="256"
              height="384"
              loading="lazy"
            />
            {data.vote_average > 0 && (
              <div className="absolute right-2 top-2">
                <Rating rating={data.vote_average} />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white md:mb-2 md:text-3xl md:font-bold">
              {"title" in data ? data.title : data.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500 md:mb-2">
              <span className="inline-flex items-center justify-center rounded-sm bg-zinc-100 px-1 text-xs font-semibold text-zinc-800">
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
            <div className="hidden md:mb-2 md:flex md:gap-2">
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
