"use client";

import { useState } from "react";
import { Cast } from "../types/people";
import Modal from "./Modal";
import Person from "./Person";
import Swiper from "./Swiper";

export default function CastRow({
  cast,
  className,
}: {
  cast: Cast[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <div className="flex gap-2 items-center justify-between mb-2">
        <h2 className="font-semibold text-zinc-100">Cast</h2>
        <button
          className="text-pink-500 text-sm"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          See All
        </button>
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
            lazy={item.profile_path ? "true" : "false"}
            style={{ width: "80px" }}
          >
            <Person person={item} />
          </swiper-slide>
        ))}
      </Swiper>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {cast.map((item: Cast) => (
          <div key={item.id}>
            <Person grid={true} person={item} />
          </div>
        ))}
      </Modal>
    </div>
  );
}
