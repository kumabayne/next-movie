"use client";

import HeroCard from "./hero-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Badge } from "./ui/badge";
import { MoviesType, MovieType } from "@/types/movie";
import CarouselThumbnail from "./carousel-thumbnail";
import { useEffect, useRef, useState } from "react";

export default function Hero({
  category,
  data,
}: {
  category: string;
  data: MoviesType;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [height, setHeight] = useState(0);

  function handleClick(index: number) {
    console.log(index);
    setCurrent(index);
  }

  function handleResize() {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      console.log(height);
      setHeight(height);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef]);

  useEffect(() => {
    console.log(`current: ${current}`);
  }, [current]);

  return (
    <div className="lg:container lg:mx-auto lg:px-6">
      <div className="mb-6 items-start lg:grid lg:grid-cols-[3fr_1fr] lg:gap-2">
        <div
          className="relative after:z-40 after:via-transparent md:px-0"
          ref={containerRef}
        >
          <Badge
            className="absolute right-2 top-2 z-40 rounded bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white md:right-4 md:top-6 lg:right-6"
            data-testid="hero-badge"
          >
            {category}
          </Badge>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {data.results.map((item: MovieType) => (
                <CarouselItem key={item.id}>
                  <HeroCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div
          className="hidden lg:grid lg:grid-rows-4 lg:gap-2 lg:overflow-hidden"
          style={{ maxHeight: `${height}px` }}
        >
          {data.results.map((item, index) => (
            <CarouselThumbnail
              key={item.id}
              current={current}
              handleClick={handleClick}
              height={height}
              index={index}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
