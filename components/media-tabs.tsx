"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Image as ImageType, Video } from "../types/media";
import Image from "next/image";
import { configuration } from "@/utils/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  IconChevronLeft,
  IconChevronRight,
  IconMovie,
  IconPhoto,
} from "@tabler/icons-react";

function isImage(media: ImageType | Video): media is ImageType {
  return (media as ImageType).aspect_ratio !== undefined;
}

export default function MediaTabs({
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
    <div className="w-full sm:px-0">
      <Tabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabsList className="flex max-w-sm space-x-1 rounded-xl border p-1">
          {Object.keys(categories).map((category) => (
            <TabsTrigger key={category} className="" value={category}>
              {category === "Videos" ? (
                <div className="flex items-center gap-1">
                  <IconMovie className="h-6 w-6" />
                  <span>{category}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <IconPhoto className="h-6 w-6" />
                  <span>{category}</span>
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(categories).map((data: any, idx) => (
          <TabsContent
            key={idx}
            className={clsx(
              "rounded border p-3",
              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
            )}
            value={categories[idx]}
          >
            {data.length ? (
              "file_path" in data[currentIndex[idx]] &&
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
                  className="aspect-video h-full w-full rounded"
                  src={`https://www.youtube.com/embed/${
                    data[currentIndex[idx]].key
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )
            ) : (
              <div className="text-center">
                No {idx === 0 ? "Videos" : "Backdrops"} to show.
              </div>
            )}
          </TabsContent>
        ))}
        <button
          className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-sm border border-white/10 bg-white/20 p-1 text-white backdrop-blur-sm"
          onClick={handlePrev}
          type="button"
        >
          <IconChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-sm border border-white/10 bg-white/20 p-1 text-white backdrop-blur-sm"
          onClick={handleNext}
          type="button"
        >
          <IconChevronRight className="h-6 w-6" />
        </button>
      </Tabs>
    </div>
  );
}
