"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      className="relative w-full max-w-80"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/search/${encodeURIComponent(value)}`);
        setValue("");
      }}
    >
      <input
        aria-label="search"
        className="bg-zinc-100/10 pl-2.5 pr-8 py-1 rounded-full text-zinc-100 w-full"
        id="search"
        name="search"
        placeholder="search..."
        type="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute p-1.5 right-0 text-zinc-400" type="submit">
        <div className="sr-only">Search</div>
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
