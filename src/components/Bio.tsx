"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { PersonDetails } from "../types/people";
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { configuration } from "../utils/data";
import { calculateAge, formatDate } from "../utils/helpers";
import Rating from "./Rating";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Bio({ data }: { data: PersonDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const paragraphs = data.biography.split("\n\n");

  return (
    <Dialog>
      <DialogTrigger className="text-pink-500 text-sm flex">
        <p className="line-clamp-4 text-xs text-zinc-400 text-left">
          {data.biography}
        </p>
        <div className="self-end text-zinc-200">
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90%]">
        <div className="max-h-96 overflow-scroll mt-4 pr-4">
          <div className="gap-2 grid grid-cols-profile mb-4">
            <div className="relative self-start">
              <Image
                className="rounded"
                src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${data.profile_path}`}
                alt={data.name}
                width="1920"
                height="1080"
              />
              <div className="absolute right-1 bottom-1">
                <Rating rating={Math.round(data.popularity)} fixed={0} />
              </div>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl text-zinc-100">
                  {data.name}
                </h1>
                <p className="text-xs text-zinc-400">
                  <span className="font-extrabold">Born</span>
                  <span className="font-semibold">&nbsp;&middot;&nbsp;</span>
                  <span className="font-semibold">
                    {formatDate(data.birthday)}
                    {!data.deathday &&
                      ` (${calculateAge(data.birthday)} years old)`}
                  </span>
                </p>
                {data.deathday && (
                  <p className="text-xs text-zinc-400">
                    <span className="font-extrabold">Died</span>
                    <span className="font-semibold">&nbsp;&middot;&nbsp;</span>
                    <span className="font-semibold">
                      {`${formatDate(data.deathday)} (${calculateAge(
                        data.birthday,
                        data.deathday
                      )} years old)`}
                    </span>
                  </p>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                <b>Known For:</b> {data.known_for_department}
              </p>
              <p className="text-xs text-zinc-400">
                <b>Place of Birth:</b> {data.place_of_birth}
              </p>
            </div>
          </div>
          {paragraphs.map((item, i) => (
            <p key={i} className="mb-4 text-sm text-zinc-400">
              {item}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
