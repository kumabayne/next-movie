"use client";

import { Image as ImageType } from "../types/media";
import Image from "next/image";
import { configuration } from "@/utils/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function MediaGallery({
  data,
}: {
  data: {
    Backdrops: ImageType[];
  };
}) {
  const trigger = data.Backdrops[0];

  return (
    <div className="w-full sm:px-0">
      <Dialog>
        <DialogTrigger>
          <Image
            className="rounded-xl"
            src={`${configuration.images.secure_base_url}${
              configuration.images.backdrop_sizes[1]
            }${trigger.file_path}`}
            width={trigger.width}
            height={trigger.height}
            alt=""
          />
        </DialogTrigger>
        <DialogContent
          className="block max-w-[90%] bg-transparent p-0"
          closeBtnClassName="top-2 right-2 fixed"
        >
          <DialogTitle className="sr-only">Backdrops</DialogTitle>
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {data.Backdrops.map((image, i) => (
                <CarouselItem key={i}>
                  <Image
                    src={`${configuration.images.secure_base_url}${
                      configuration.images.backdrop_sizes[1]
                    }${image.file_path}`}
                    width={image.width}
                    height={image.height}
                    alt=""
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 border-none bg-white text-black hover:bg-white hover:text-black" />
            <CarouselNext className="-right-4 border-none bg-white text-black hover:bg-white hover:text-black" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
