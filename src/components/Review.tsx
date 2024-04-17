"use client";

import { formatDate } from "../utils/helpers";
import { Review } from "../types/reviews";
import clsx from "clsx";
import Image from "next/image";
import { configuration } from "../utils/data";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Rating from "./Rating";

export default function Review({ review }: { review: Review }) {
  const reviewRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const paragraphs = review.content.split("\r\n\r\n");

  useEffect(() => {
    if (
      reviewRef.current !== null &&
      reviewRef.current.scrollHeight > reviewRef.current?.clientHeight
    ) {
      setIsClamped(true);
    } else {
      setIsExpanded(true);
    }
  }, [reviewRef]);

  return (
    <div className="bg-zinc-800 p-4 relative rounded">
      <div
        className={clsx(
          "flex gap-2 justify-between items-center mb-2 relative",
          !isClamped &&
            !isExpanded &&
            "after:absolute after:bg-zinc-700 after:inset-0 after:-right-2 after:rounded"
        )}
      >
        <div className="inline-flex gap-2">
          {review.author_details.avatar_path ? (
            <div>
              <Image
                className="rounded-full"
                src={`${configuration.images.secure_base_url}w90_and_h90_face/${review.author_details.avatar_path}`}
                width="32"
                height="32"
                alt={review.author_details.username}
              />
            </div>
          ) : (
            <div className="bg-indigo-600 flex font-semibold h-8 items-center justify-center rounded-full text-white w-8">
              {review.author_details.username.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold leading-tight text-sm text-zinc-200">
              {review.author_details.username}
            </h3>
            <p className="italic leading-tight text-xs text-zinc-400">
              {formatDate(review.created_at)}
            </p>
          </div>
        </div>
        {typeof review.author_details.rating === "number" && (
          <div className="flex justify-start">
            <Rating fixed={0} rating={review.author_details.rating} />
          </div>
        )}
      </div>
      <div ref={reviewRef} className={clsx(!isExpanded && "line-clamp-6")}>
        {paragraphs.map((text, index) => (
          <p
            key={index}
            className={clsx(
              "leading-tight mb-2 relative text-sm text-zinc-400",
              !isClamped &&
                !isExpanded &&
                "after:absolute after:bg-zinc-700 after:inset-0 after:rounded"
            )}
            data-testid={`user-review-${index}`}
          >
            {text}
          </p>
        ))}
      </div>
      {!isExpanded && isClamped && (
        <button
          className="absolute bg-gradient-to-t from-zinc-800 via-zinc-800 via-90% to-transparent bottom-0 duration-300 ease-in-out flex font-semibold justify-center left-0 px-2 py-1 right-0 rounded-b text-center text-xs text-white transition-colors w-full hover:bg-white/20"
          onClick={() => setIsExpanded(true)}
          type="button"
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
