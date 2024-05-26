"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/src/utils/data";
import { Movie } from "../types/movie";
import Rating from "./Rating";

export default function HeroCard({
  item,
  title,
}: {
  item: Movie;
  title: string;
}) {
  return (
    <Link href={`/movie/${item.id}`}>
      <div className="relative text-center">
        <Image
          className="mb-1 rounded-lg md:rounded-none"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
          alt={item.title}
          width="1920"
          height="1080"
          priority
        />
        <div className="absolute right-2 top-2 md:hidden">
          <Rating rating={item.vote_average} />
        </div>
        <div className="absolute backdrop-blur-md bg-white/10 bottom-2 drop-shadow px-2 py-1 right-2 rounded-sm shadow text-right md:text-left md:left-0 md:right-0 md:bottom-0 md:bg-transparent md:backdrop-blur-none md:drop-shadow-none md:bg-gradient-to-t md:from-black/60 md:to-transparent md:px-6 md:pb-4 md:pt-8 md:rounded-none">
          <h1 className="hidden md:block font-black uppercase text-pink-500 text-sm tracking-widest drop-shadow-sm">
            {title}
          </h1>
          <div className="flex flex-wrap gap-2 items-center">
            <h2 className="font-semibold text-zinc-100 md:text-3xl md:font-bold">
              {item.title}
            </h2>
            <div className="hidden md:inline-block">
              <Rating rating={item.vote_average} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
