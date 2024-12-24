"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/src/utils/data";
import { Movie } from "../types/movie";
import Rating from "./Rating";
import Container from "./Container";
import Watchlist from "./Watchlist";
import Favorite from "./Favorite";

export default function HeroCard({
  item,
  title,
}: {
  item: Movie;
  title: string;
}) {
  return (
    <div>
      <Link className="block relative" href={`/movie/${item.id}`}>
        <div className="relative lg:max-h-[600px] after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent">
          <Image
            className="mb-1 lg:max-h-[600px] object-cover"
            src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
            alt={item.title}
            width="1920"
            height="1080"
            priority
          />
          <Container className="absolute bottom-0 z-20">
            <div className="grid gap-1 grid-cols-[80px_auto] items-end md:grid-cols-[160px_auto] xl:grid-cols-[240px_auto] md:gap-4 lg:gap-6">
              <div className="relative">
                <Image
                  className="rounded-sm md:rounded-md drop-shadow"
                  src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${item.poster_path}`}
                  alt={item.title}
                  width="256"
                  height="384"
                  loading="lazy"
                />
                <div className="absolute top-0 right-0">
                  <Rating rating={item.vote_average} />
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-zinc-100 md:text-3xl md:font-bold xl:text-4xl text-2xl">
                  {item.title}
                </h2>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div className="flex gap-2 mt-2 md:mt-4 md:gap-4">
            <Watchlist />
            <Favorite />
          </div>
        </Container>
      </Link>
    </div>
  );
}
