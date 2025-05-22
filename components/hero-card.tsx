"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/utils/data";
import { MovieType } from "../types/movie";
import Container from "./container";
import Rating from "./rating";
import Typography from "./typography";
import { Badge } from "./ui/badge";
import { formatDate } from "@/lib/utils";

export default function HeroCard({ item }: { item: MovieType }) {
  return (
    <Link className="relative block" href={`/movie/${item.id}`}>
      <div className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-transparent after:to-black/70 xl:after:to-transparent">
        <Image
          alt={item.title}
          className="lg:hidden"
          data-testid="herocard-backdrop"
          height="489"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[1]}${item.backdrop_path}`}
          width="780"
          priority
        />
        <Image
          alt={item.title}
          className="hidden lg:block xl:hidden"
          data-testid="herocard-backdrop"
          height="720"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[2]}${item.backdrop_path}`}
          width="1280"
          priority
        />
        <Image
          alt={item.title}
          className="hidden rounded-3xl xl:block"
          data-testid="herocard-backdrop"
          height="2160"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
          width="3840"
          priority
        />
      </div>
      <Container className="absolute bottom-0">
        <div className="space-y-2 md:space-y-3 lg:space-y-4">
          <div className="md:space-y-1 lg:space-y-2">
            <div>
              <Badge
                className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase leading-none tracking-widest text-black hover:bg-white"
                data-testid="hero-badge"
              >
                In Theaters
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Rating rating={item.vote_average} />
              <span>&middot;</span>
              <p className="text-xs font-medium text-white md:text-sm lg:text-base">
                {formatDate(item.release_date)}
              </p>
            </div>
          </div>
          <div className="md:space-y-1 lg:space-y-2">
            <Typography as="h1" className="text-white">
              {item.title}
            </Typography>
            <p className="line-clamp-2 text-sm md:line-clamp-none md:text-base lg:text-xl">
              {item.overview}
            </p>
          </div>
        </div>
      </Container>
    </Link>
  );
}
