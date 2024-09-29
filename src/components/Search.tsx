"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");

  return (
    <form
      className="relative w-full flex rounded-full border items-center px-3 gap-1 py-1 max-w-xs"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/search/${encodeURIComponent(value)}`);
        setValue("");
      }}
    >
      <MagnifyingGlassIcon className="h-4 w-4" />
      <input
        aria-label="search"
        className="text-zinc-100 w-full bg-transparent p-1 text-sm"
        id="search"
        name="search"
        placeholder="search..."
        type="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
