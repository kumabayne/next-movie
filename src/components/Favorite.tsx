"use client";

import { IconHeart } from "@tabler/icons-react";
import { SyntheticEvent } from "react";

export default function Favorite() {
  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="flex gap-1 items-center text-sm text-white font-medium"
      onClick={handleClick}
      type="button"
    >
      <IconHeart className="h-6 w-6" />
      Favorite
    </button>
  );
}
