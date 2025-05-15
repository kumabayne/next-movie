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
  heading: string;
  className?: string;
}) {
  return (
    <>
      <Typography as="h2" className="mb-2">
        {heading}
      </Typography>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4 xl:-ml-6">
          {data.results.map((item: MovieType | PersonType | TVShow) => (
            <CarouselItem
              key={item.id}
              className="basis-[152px] pl-2 sm:basis-[168px] md:basis-[192px] md:pl-4 xl:basis-[226] xl:pl-6"
            >
              <MediaCard key={item.id} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
