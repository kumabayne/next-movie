"use client";

import {
  IconHeart,
  IconHeartFilled,
  IconHeartMinus,
  IconHeartPlus,
} from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";

export default function Favorite({ favorite = false }: { favorite?: boolean }) {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((favorite) => !favorite);
  };

  return (
    <button
      className="flex items-center gap-1 text-sm text-white"
      onClick={handleClick}
      type="button"
    >
      {isFavorite ? (
        <IconHeartMinus className="h-6 w-6" data-testid="favorite-filled" />
      ) : (
        <IconHeartPlus className="h-6 w-6" data-testid="favorite-empty" />
      )}
      <span className="sr-only">
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </span>
    </button>
  );
}
