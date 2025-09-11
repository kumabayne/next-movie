"use client";

import HeroCard from "./hero-card";
import { MoviesType, MovieType } from "@/types/movie";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

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
    </Carousel>
  );
}
