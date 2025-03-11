"use client";

import { Cast } from "../../types/people";
import Person from "../../components/person";
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
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-white">Cast</h2>
        <Dialog>
          <DialogTrigger className="text-sm text-pink-500">
            See All
          </DialogTrigger>
          <DialogContent className="max-w-[90%]">
            <div className="mt-4 grid max-h-96 gap-2 overflow-scroll pr-4 md:grid-cols-2 md:gap-6 lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
              {cast.map((item: Cast) => (
                <div key={item.id} className="rounded border p-2">
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
