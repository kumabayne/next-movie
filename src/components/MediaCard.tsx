"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/src/utils/data";
import { Movie } from "../types/movie";
import { TVShow } from "../types/tv";
import { Person } from "../types/people";
import clsx from "clsx";

export default function MediaCard({ item }: { item: Movie | Person | TVShow }) {
  return (
    <Link
      className="relative block w-24 md:w-32"
      href={`/${item.media_type}/${item.id}`}
    >
      <Image
        className="rounded-sm md:rounded-md"
        src={
          "profile_path" in item && !item.profile_path
            ? ""
            : `${configuration.images.secure_base_url}${
                "poster_path" in item
                  ? `${configuration.images.poster_sizes[4]}${item.poster_path}`
                  : `${configuration.images.profile_sizes[2]}${item.profile_path}`
              }`
        }
        alt={"title" in item ? item.title : item.name}
        width="160"
        height="240"
        loading="lazy"
      />
      <h2
        className={clsx(
          "font-semibold text-zinc-200 text-sm",
          "profile_path" in item && !item.profile_path
            ? "absolute bg-zinc-800 flex inset-0 items-center justify-center rounded-sm text-center"
            : "sr-only"
        )}
      >
        {"title" in item ? item.title : item.name}
      </h2>
    </Link>
  );
}
