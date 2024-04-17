"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/src/utils/data";
import { Movie } from "../types/movie";
import Rating from "./Rating";

export default function HeroCard({ item }: { item: Movie }) {
  return (
    <Link href={`/movie/${item.id}`}>
      <div className="relative text-center">
        <Image
          className="mb-1 rounded-lg"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
          alt={item.title}
          width="1920"
          height="1080"
          priority
        />
        <div className="absolute right-2 top-2">
          <Rating rating={item.vote_average} />
        </div>
        <div className="absolute backdrop-blur-md bg-white/10 bottom-2 drop-shadow px-2 py-1 right-2 rounded-sm shadow text-right">
          <h2 className="font-semibold text-zinc-100">{item.title}</h2>
        </div>
      </div>
    </Link>
  );
}
