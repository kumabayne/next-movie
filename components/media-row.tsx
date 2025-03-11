"use client";

import Container from "@/components/container";
import MediaCard from "@/components/media-card";
import { MovieType } from "../types/movie";
import { TVShow } from "../types/tv";
import { PersonType } from "../types/people";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Typography from "./typography";

export default function MediaRow({
  data,
  heading,
}: {
  data: { results: MovieType[] | PersonType[] | TVShow[] };
  heading: string;
}) {
  return (
    <Container className="mb-6">
      <Typography as="h2" className="mb-2">
        {heading}
      </Typography>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.results.map((item: MovieType | PersonType | TVShow) => (
            <CarouselItem
              key={item.id}
              className="basis-[152px] pl-2 sm:basis-[168px] md:basis-[192px] md:pl-4"
            >
              <MediaCard key={item.id} item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
}
