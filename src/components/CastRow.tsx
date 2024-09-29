"use client";

import { Cast } from "../types/people";
import Person from "./Person";
import Swiper from "./Swiper";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CastRow({
  cast,
  className,
}: {
  cast: Cast[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex gap-2 items-center justify-between mb-2">
        <h2 className="font-semibold text-white text-lg">Cast</h2>
        <Dialog>
          <DialogTrigger className="text-pink-500 text-sm">
            See All
          </DialogTrigger>
          <DialogContent className="max-w-[90%]">
            <div className="max-h-96 overflow-scroll mt-4 pr-4 grid gap-2 lg:max-h-[600px] md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
              {cast.map((item: Cast) => (
                <div key={item.id} className="border rounded p-2">
                  <Person grid={true} person={item} />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Swiper
        params={{
          injectStyles: [
            `
            .swiper-slide {
              width: 128px !important;
            }
          `,
          ],
          slidesPerView: "auto",
          spaceBetween: 8,
        }}
      >
        {cast.map((item: Cast) => (
          <swiper-slide
            key={item.id}
            // @ts-ignore
            class="CastSlide"
            lazy={item.profile_path ? "true" : "false"}
          >
            <Person person={item} grid={false} />
          </swiper-slide>
        ))}
      </Swiper>
    </div>
  );
}
