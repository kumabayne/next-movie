"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/utils/data";
import { MovieType } from "../types/movie";
import Container from "./container";
import Rating from "./rating";
import Watchlist from "./watchlist";
import Favorite from "./favorite";
import Typography from "./typography";

export default function HeroCard({ item }: { item: MovieType }) {
  return (
    <div>
      <Link
        className="relative block lg:overflow-hidden lg:rounded-2xl"
        href={`/movie/${item.id}`}
      >
        <div className="relative after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent">
          <Image
            alt=""
            className="object-cover"
            data-testid="herocard-backdrop"
            height="1080"
            src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
            width="1920"
            priority
          />
          <Container className="absolute bottom-0 z-20 mb-2 md:mb-4 lg:mb-6">
            <div className="grid grid-cols-[96px_auto] items-end gap-2 sm:grid-cols-[144px_auto] md:grid-cols-[160px_auto] md:gap-4 lg:gap-6 xl:grid-cols-[240px_auto]">
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-bl from-black/40 via-black/0 to-black/0"></div>
                <div className="absolute right-1.5 top-1.5 z-20">
                  <Watchlist />
                </div>
                <Image
                  alt={item.title}
                  className="rounded-xl drop-shadow"
                  height="384"
                  src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${item.poster_path}`}
                  width="256"
                  priority
                />
              </div>
              <div className="md:space-y-2">
                <div className="flex gap-2 md:gap-4">
                  <div>
                    <Rating className="text-white" rating={item.vote_average} />
                  </div>
                  <div className="flex gap-2 md:gap-4">
                    <Favorite />
                  </div>
                </div>
                <Typography as="h1" className="leading-tight text-zinc-100">
                  {item.title}
                </Typography>
              </div>
            </div>
          </Container>
        </div>
      </Link>
    </div>
  );
}
