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
      <Link className="block relative mb-4" href={`/movie/${item.id}`}>
        <div className="relative text-center after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent">
          <Image
            className="mb-1"
            src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
            alt={item.title}
            width="1920"
            height="1080"
            priority
          />
        </div>
        <Container className="absolute bottom-0 z-20">
          <div className="flex gap-2 items-end">
            <Image
              className="rounded-sm md:rounded-md drop-shadow"
              src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${item.poster_path}`}
              alt={item.title}
              width="80"
              height="120"
              loading="lazy"
            />
            <div>
              <h2 className="font-semibold text-zinc-100 md:text-3xl md:font-bold">
                {item.title}
              </h2>
              <Rating rating={item.vote_average} />
            </div>
          </div>
        </Container>
      </Link>
      <Container>
        <div className="flex gap-2 mb-2">
          <Watchlist />
          <Favorite />
        </div>
      </Container>
    </div>
  );
}
