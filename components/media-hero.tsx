"use client";

import Image from "next/image";
import { configuration } from "@/utils/data";
import { MovieDetails } from "../types/movie";
import Rating from "./rating";
import { TVShowDetails } from "../types/tv";
import Container from "./container";
import Watchlist from "./watchlist";
import Favorite from "./favorite";
import GenreRow from "./genre-row";
import Typography from "./typography";
import { Badge } from "./ui/badge";

export default function MediaHero({
  data,
}: {
  data: MovieDetails | TVShowDetails;
}) {
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
          className="mb-4 object-cover object-top lg:max-h-[600px]"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${data.backdrop_path}`}
          alt={"title" in data ? data.title : data.name}
          width="1920"
          height="1080"
          priority
        />
      </div>
      <Container className="absolute bottom-0 z-20">
        <div className="grid grid-cols-[100px_auto] items-end gap-2 sm:grid-cols-[180px_auto] sm:gap-4 md:gap-4 lg:gap-6 xl:grid-cols-[240px_auto]">
          <div className="relative">
            <Image
              className="rounded-xl drop-shadow"
              src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${data.poster_path}`}
              alt={"title" in data ? data.title : data.name}
              width="256"
              height="384"
              loading="lazy"
            />
          </div>
          <div>
            <div className="md:space-y-1 lg:space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  className="rounded-full bg-white text-[10px] font-bold uppercase leading-none text-black"
                  data-testid="hero-badge"
                >
                  {rating || "NR"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Rating className="text-white" rating={data.vote_average} />
                <span>&middot;</span>
                <p className="text-xs font-medium text-white md:text-sm lg:text-base">
                  {year}
                </p>
                {"runtime" in data && (
                  <>
                    <span>&middot;</span>
                    {data.runtime > 0 ? (
                      <p className="text-xs font-medium text-white md:text-sm lg:text-base">
                        {data.runtime}m
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-white md:text-sm lg:text-base">
                        Runtime: Unknown
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
            <Typography as="h1">
              {"title" in data ? data.title : data.name}
            </Typography>
            <div className="hidden md:mb-2 md:flex md:gap-2">
              <Watchlist />
              <Favorite />
            </div>
            {/* <div className="hidden md:block">
              <GenreRow genres={data.genres} media={true} />
            </div> */}
          </div>
        </div>
      </Container>
    </>
  );
}
