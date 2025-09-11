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
      <div className="relative max-h-[80svh]">
        <Image
          alt={item.title}
          className="overflow-hidden object-cover object-center"
          data-testid="herocard-backdrop"
          height="3840"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${item.backdrop_path}`}
          width="2160"
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-2 md:py-4 lg:py-12 xl:py-16">
        <Container>
          <div className="space-y-2 md:space-y-3 lg:space-y-4">
            <div className="md:space-y-1 lg:space-y-2">
              <Badge
                className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase leading-none tracking-widest text-black hover:bg-white"
                data-testid="hero-badge"
              >
                In Theaters
              </Badge>
              <div>
                <Typography as="h1" className="text-white">
                  {item.title}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-medium text-white md:text-sm lg:text-base">
                  {formatDate(item.release_date)}
                </p>
                <span>&middot;</span>
                <Rating rating={item.vote_average} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Link>
  );
}
