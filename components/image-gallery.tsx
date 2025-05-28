"use client";

import { IconChevronLeft, IconLibraryPhoto } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { type Images } from "@/types/people";
import { configuration } from "@/utils/data";

export default function ImageGallery({
  images,
  trigger,
}: {
  images: Images;
  trigger: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <Dialog>
      <DialogTrigger className="relative">
        <IconLibraryPhoto className="absolute bottom-2 right-2 h-6 w-6 drop-shadow-md" />
        <Image
          className="rounded-xl"
          src={trigger.src}
          alt={trigger.alt}
          width={trigger.width}
          height={trigger.height}
        />
      </DialogTrigger>
      <DialogContent className="border-none p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{`Image Gallery for ${trigger.alt}`}</DialogTitle>
          <DialogDescription>Click to view all images</DialogDescription>
        </DialogHeader>
        <Carousel>
          <CarouselContent>
            {images.profiles.map((image) => (
              <CarouselItem key={image.file_path}>
                <Image
                  className="h-full w-full rounded-xl object-cover"
                  src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${image.file_path}`}
                  alt={trigger.alt}
                  width={image.width}
                  height={image.height}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 h-12 w-12 -translate-x-1/2 border-none bg-white text-black hover:bg-white hover:text-black">
            <IconChevronLeft className="h-6 w-6" />
          </CarouselPrevious>
          <CarouselNext className="right-0 h-12 w-12 translate-x-1/2 border-none bg-white text-black hover:bg-white hover:text-black" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
