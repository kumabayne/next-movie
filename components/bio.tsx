"use client";

import { useState } from "react";
import { PersonDetailsType } from "../types/people";
import { cn } from "@/lib/utils";

export default function Bio({ data }: { data: PersonDetailsType }) {
  const [open, setOpen] = useState(false);
  const paragraphs = data.biography.split("\n\n");

  return (
    <div>
      <div
        className={cn(
          "space-y-2",
          !open && "line-clamp-4",
          open && "line-clamp-none",
        )}
      >
        {paragraphs.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
      <div className="flex justify-end">
        <button
          className="text-sm font-medium"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}
