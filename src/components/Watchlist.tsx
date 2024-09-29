"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import { SyntheticEvent } from "react";

export default function Watchlist() {
  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="text-white text-sm flex gap-1 items-center"
      onClick={handleClick}
      type="button"
    >
      <BookmarkIcon className="w-5 h-5 md:h-6 md:w-6" /> Watch Later
    </button>
  );
}
