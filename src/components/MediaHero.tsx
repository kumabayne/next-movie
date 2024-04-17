"use client";

import Image from "next/image";
import { configuration } from "../utils/data";
import { MovieDetails } from "../types/movie";
import Rating from "./Rating";
import { PlayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { TVShowDetails } from "../types/tv";

export default function MediaHero({ data }: { data: MovieDetails | TVShowDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const trailers = data.videos.results.filter(
    (video) => video.type === "Trailer"
  );

  return (
    <>
      <div className="relative">
        <Image
          className="mb-4 rounded"
          src={`${configuration.images.secure_base_url}${configuration.images.backdrop_sizes[3]}${data.backdrop_path}`}
          alt={"title" in data ? data.title : data.name}
          width="1920"
          height="1080"
          priority
        />
        <div className="absolute right-2 top-2">
          <Rating rating={data.vote_average} />
        </div>
        {trailers.length > 0 && (
          <button
            className="absolute backdrop-blur-md bg-white/10 bottom-2 drop-shadow flex font-semibold gap-1 items-center px-2 py-1 right-2 rounded-sm shadow text-sm text-white"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <PlayIcon className="h-5 w-5" />
            Trailer
          </button>
        )}
      </div>
      {trailers.length > 0 && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <iframe
            className="aspect-video h-full w-full"
            src={`https://www.youtube.com/embed/${trailers[0].key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal>
      )}
    </>
  );
}
