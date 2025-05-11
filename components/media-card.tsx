"use client";

import Image from "next/image";
import Link from "next/link";
import { configuration } from "@/utils/data";
import { MovieType } from "../types/movie";
import { TVShow } from "../types/tv";
import { PersonType } from "../types/people";
import {
  IconBookmarkPlus,
  IconHeartPlus,
  IconStarFilled,
  IconUser,
} from "@tabler/icons-react";

export default function MediaCard({
  item,
}: {
  item: MovieType | PersonType | TVShow;
}) {
  const src =
    "poster_path" in item && item.poster_path
      ? `${configuration.images.poster_sizes[4]}${item.poster_path}`
      : "profile_path" in item && item.profile_path
        ? `${configuration.images.profile_sizes[2]}${item.profile_path}`
        : "";

  return (
    <Link
      className="relative flex flex-col"
      href={`/${item.media_type}/${item.id}`}
    >
      <div className="relative">
        <div className="absolute right-1.5 top-1.5 z-20 inline-flex flex-col gap-1">
          <button className="text-white" type="button">
            <IconBookmarkPlus
              className="h-6 w-6 drop-shadow-sm xl:h-8 xl:w-8"
              stroke="1.5"
            />
          </button>
        </div>
        {src && (
          <div className="relative">
            <div className="to-black/ pointer-events-none absolute inset-0 z-10 rounded-xl bg-gradient-to-bl from-black/40 via-black/0"></div>
            <Image
              alt={"title" in item ? item.title : item.name}
              className="h-[216px] w-36 rounded-xl sm:h-60 sm:w-40 md:h-[264px] md:w-44 lg:h-[288px] lg:w-48 xl:h-[312px] xl:w-52"
              height="240"
              loading="lazy"
              src={`${configuration.images.secure_base_url}${src}`}
              width="160"
            />
          </div>
        )}
        {!src && (
          <div className="relative flex h-[216px] w-36 flex-col items-center justify-center rounded-xl bg-neutral-900 p-2 text-white sm:h-60 sm:w-40 md:h-[264px] md:w-44 lg:h-[288px] lg:w-48 xl:h-[312px] xl:w-52">
            {"gender" in item && (
              <IconUser
                data-testid="mediacard-icon"
                className="h-12 w-12"
                stroke="1.5"
              />
            )}
          </div>
        )}
      </div>
      <div className="space-y-1 p-2">
        {"vote_average" in item && (
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-1">
              <IconStarFilled className="h-4 w-4" />
              <span className="text-sm">{item.vote_average.toFixed(1)}</span>
            </div>
            <button className="text-black" type="button">
              <IconHeartPlus className="h-4 w-4 drop-shadow-sm" />
            </button>
          </div>
        )}
        <h3 className="line-clamp-2 text-sm font-medium leading-tight">
          {"title" in item ? item.title : item.name}
        </h3>
      </div>
    </Link>
  );
}
