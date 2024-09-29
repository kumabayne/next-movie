"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { SyntheticEvent } from "react";

export default function Favorite() {
  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="flex gap-1 items-center text-sm text-white"
      onClick={handleClick}
      type="button"
    >
      <HeartIcon className="w-5 h-5 md:h-6 md:w-6" />
      Favorite
    </button>
  );
}
