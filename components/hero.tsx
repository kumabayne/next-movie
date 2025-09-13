"use client";

import HeroCard from "./hero-card";
import { MoviesType, MovieType } from "@/types/movie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function Hero({ data }: { data: MoviesType }) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        {data.results.map((item: MovieType) => (
          <CarouselItem key={item.id}>
            <HeroCard item={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden border-transparent bg-white/20 hover:bg-white/30 focus:bg-white/30 lg:left-4 lg:flex" />
      <CarouselNext className="hidden border-transparent bg-white/20 hover:bg-white/30 focus:bg-white/30 lg:right-4 lg:flex" />
    </Carousel>
  );
}
