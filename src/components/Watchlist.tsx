"use client";

import { IconBookmark } from "@tabler/icons-react";
import { SyntheticEvent } from "react";

export default function Watchlist() {
  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="text-white text-sm flex gap-1 items-center font-medium"
      onClick={handleClick}
      type="button"
    >
      <IconBookmark className="w-6 h-6" /> Watch Later
    </button>
  );
}
