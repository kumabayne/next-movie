"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GenreType } from "../types/genre";
import GenreCard from "./genre-card";
import {
  IconBooks,
  IconCompass,
  IconDeviceTvOld,
  IconFriends,
  IconGavel,
  IconGhost2,
  IconHeart,
  IconHorse,
  IconMasksTheater,
  IconMusic,
  IconPencil,
  IconSearch,
  IconSlice,
  IconSwords,
  IconTank,
  IconTower,
  IconUfo,
  IconVideo,
} from "@tabler/icons-react";
import Typography from "./typography";
import Container from "@/components/container";

const genres = [
  {
    id: 28,
    name: "Action",
    Icon: IconSwords,
  },
  {
    id: 12,
    name: "Adventure",
    Icon: IconCompass,
  },
  {
    id: 16,
    name: "Animation",
    Icon: IconPencil,
  },
  {
    id: 35,
    name: "Comedy",
    Icon: IconMasksTheater,
  },
  {
    id: 80,
    name: "Crime",
    Icon: IconGavel,
  },
  {
    id: 99,
    name: "Documentary",
    Icon: IconVideo,
  },
  {
    id: 18,
    name: "Drama",
    Icon: IconMasksTheater,
  },
  {
    id: 10751,
    name: "Family",
    Icon: IconFriends,
  },
  {
    id: 14,
    name: "Fantasy",
    Icon: IconTower,
  },
  {
    id: 36,
    name: "History",
    Icon: IconBooks,
  },
  {
    id: 27,
    name: "Horror",
    Icon: IconGhost2,
  },
  {
    id: 10402,
    name: "Music",
    Icon: IconMusic,
  },
  {
    id: 9648,
    name: "Mystery",
    Icon: IconSearch,
  },
  {
    id: 10749,
    name: "Romance",
    Icon: IconHeart,
  },
  {
    id: 878,
    name: "Science Fiction",
    Icon: IconUfo,
  },
  {
    id: 10770,
    name: "TV Movie",
    Icon: IconDeviceTvOld,
  },
  {
    id: 53,
    name: "Thriller",
    Icon: IconSlice,
  },
  {
    id: 10752,
    name: "War",
    Icon: IconTank,
  },
  {
    id: 37,
    name: "Western",
    Icon: IconHorse,
  },
];

export default function GenreRow({ media }: { media: boolean }) {
  return (
    <Container className="mb-6">
      <Typography as="h2" className="mb-2">
        Genres
      </Typography>
      <Carousel>
        <CarouselContent className="-ml-2">
          {genres.map((item: GenreType) => (
            <CarouselItem key={item.id} className="basis-[auto] pl-2">
              <GenreCard key={item.id} item={item} media={media} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
}
