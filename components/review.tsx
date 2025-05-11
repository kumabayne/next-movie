"use client";

import { formatDate } from "@/utils/helpers";
import { Review as ReviewType } from "../types/reviews";
import clsx from "clsx";
import Image from "next/image";
import { configuration } from "@/utils/data";
import { useEffect, useRef, useState } from "react";
import Rating from "./rating";
import { IconChevronDown } from "@tabler/icons-react";

export default function Review({ review }: { review: ReviewType }) {
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
    <div className="relative rounded border p-4">
      <div
        className={clsx(
          "relative mb-2 flex items-center justify-between gap-2",
          !isClamped &&
            !isExpanded &&
            "after:absolute after:inset-0 after:-right-2 after:rounded after:bg-zinc-700",
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              {review.author_details.username.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium leading-tight text-white">
              {review.author_details.username}
            </h3>
            <p className="text-sm font-medium italic leading-tight text-neutral-400">
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
              "relative mb-2 text-sm text-white",
              !isClamped &&
                !isExpanded &&
                "after:absolute after:inset-0 after:rounded after:bg-zinc-700",
            )}
            data-testid={`user-review-${index}`}
          >
            {text}
          </p>
        ))}
      </div>
      {!isExpanded && isClamped && (
        <button
          className="absolute bottom-0 left-0 right-0 flex w-full justify-center rounded-b bg-gradient-to-t from-background via-background via-90% to-transparent p-1 text-center text-xs font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-white/20"
          onClick={() => setIsExpanded(true)}
          type="button"
        >
          <IconChevronDown className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
