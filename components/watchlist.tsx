"use client";

import { cn } from "@/lib/utils";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";
import { SyntheticEvent, useState } from "react";

export default function Watchlist({
  inWatchlist = false,
  size,
}: {
  inWatchlist?: boolean;
  size?: string;
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(inWatchlist);

  const handleClick = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsInWatchlist((watchlist) => !watchlist);
  };

  return (
    <button
      className="flex items-center gap-1 text-sm font-medium text-white"
      onClick={handleClick}
      type="button"
    >
      {isInWatchlist ? (
        <IconBookmarkMinus
          className={cn(!size && "h-6 w-6", size === "sm" && "h-4 w-4")}
          data-testid="watchlist-filled"
        />
      ) : (
        <IconBookmarkPlus
          className={cn(!size && "h-6 w-6", size === "sm" && "h-4 w-4")}
          data-testid="watchlist-empty"
        />
      )}{" "}
      <span className="sr-only">
        {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      </span>
    </button>
  );
}
