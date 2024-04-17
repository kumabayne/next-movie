"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Image as ImageType, Video } from "../types/media";
import Image from "next/image";
import { configuration } from "../utils/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function isImage(media: ImageType | Video): media is ImageType {
  return (media as ImageType).aspect_ratio !== undefined;
}

export default function Tabs({
  data,
}: {
  data: {
    Backdrops: ImageType[];
    Videos: Video[];
  };
}) {
  const [index, setIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({
    "0": 0,
    "1": 0,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  let [categories] = useState(data);

  const handlePrev = () => {
    const currentData = Object.values(categories)[selectedIndex];
    if (index === 0) {
      setIndex(currentData.length - 1);
      setCurrentIndex({
        ...currentIndex,
        [selectedIndex]: currentData.length - 1,
      });
    } else {
      setIndex(index - 1);
      setCurrentIndex({
        ...currentIndex,
        [selectedIndex]: index - 1,
      });
    }
  };

  const handleNext = () => {
    const currentData = Object.values(categories)[selectedIndex];
    if (index === currentData.length - 1) {
      setIndex(0);
      setCurrentIndex({
        ...currentIndex,
        [selectedIndex]: 0,
      });
    } else {
      setIndex(index + 1);
      setCurrentIndex({
        ...currentIndex,
        [selectedIndex]: index + 1,
      });
    }
  };

  useEffect(() => {
    setIndex(currentIndex[selectedIndex]);
  }, [currentIndex, selectedIndex]);

  return (
    <div className="w-full max-w-md sm:px-0">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-800 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-zinc-700 text-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 relative">
          {Object.values(categories).map((data: any, idx) => (
            <Tab.Panel
              key={idx}
              className={clsx(
                "rounded bg-zinc-800 p-3",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              {"file_path" in data[currentIndex[idx]] &&
              "width" in data[currentIndex[idx]] &&
              "height" in data[currentIndex[idx]] ? (
                <Image
                  className="aspect-video rounded"
                  src={`${configuration.images.secure_base_url}${
                    configuration.images.backdrop_sizes[1]
                  }${data[currentIndex[idx]].file_path}`}
                  width={data[currentIndex[idx]].width}
                  height={data[currentIndex[idx]].height}
                  alt=""
                />
              ) : (
                <iframe
                  className="aspect-video h-full rounded w-full"
                  src={`https://www.youtube.com/embed/${
                    data[currentIndex[idx]].key
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </Tab.Panel>
          ))}
          <button
            className="absolute backdrop-blur-sm bg-white/20 border border-white/10 left-1.5 p-1 rounded-sm text-white top-1/2 -translate-y-1/2"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="absolute backdrop-blur-sm bg-white/20 border border-white/10 p-1 right-1.5 rounded-sm text-white top-1/2 -translate-y-1/2"
            onClick={handleNext}
            type="button"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
