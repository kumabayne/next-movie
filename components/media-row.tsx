"use client";

import Container from "@/components/container";
import MediaCard from "@/components/media-card";
import { MovieType } from "../types/movie";
import { TVShow } from "../types/tv";
import { PersonType } from "../types/people";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Typography from "./typography";
import { cn } from "@/lib/utils";

export default function MediaRow({
  data,
  heading,
  className,
}: {
  data: { results: MovieType[] | PersonType[] | TVShow[] };
  heading?: string;
  className?: string;
}) {
  return (
    <>
      {heading && (
        <Typography as="h2" className="mb-2">
          {heading}
        </Typography>
      )}
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className="-ml-2 md:-ml-4 xl:-ml-6">
          {data.results.map((item: MovieType | PersonType | TVShow) => (
            <CarouselItem
              key={item.id}
              className="basis-[152px] pl-2 sm:basis-[168px] md:basis-[192px] md:pl-4 xl:basis-[226px] xl:pl-6"
            >
              <MediaCard
                key={item.id}
                item={item}
                imageClassName="h-[216px] w-36 rounded-xl sm:h-60 sm:w-40 md:h-[264px] md:w-44 xl:h-[303px] xl:w-[202px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
