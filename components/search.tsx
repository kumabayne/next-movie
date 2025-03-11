"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@/lib/utils";
import SearchResult from "./search-result";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Search() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState("multi");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState({});

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    if (query.trim()) {
      const res = await fetch(`/api/search?query=${query}&filter=${filter}`, {
        method: "GET",
      });
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const results = await res.json();
      setResults(results);
    }
  }

  function handleClick() {
    setOpen(false);
  }

  async function handleSelect(value: string) {
    setFilter(value);
    const query = inputRef.current?.value || "";
    if (query.trim()) {
      const res = await fetch(`/api/search?query=${query}&filter=${value}`, {
        method: "GET",
      });
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      const results = await res.json();
      setResults(results);
    }
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");

    if (typeof query === "string") {
      if (query.trim()) {
        router.push(`/search?query=${encodeURIComponent(query)}`);
        setOpen(false);
      }
    }
  }

  useEffect(() => {
    if (!open) {
      setResults({});
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-2">
        <IconSearch className="h-6 w-6" />
        <span className="sr-only">
          Search for movies, tv shows, people and more...
        </span>
      </DialogTrigger>
      <DialogContent
        className="top-0 min-h-[56px] translate-y-0 px-2 py-1.5"
        hideCloseBtn={true}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-row items-center gap-2 space-y-0">
          <Select onValueChange={handleSelect} value={filter}>
            <SelectTrigger className="line-clamp-none flex w-auto shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multi">All</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">TV Shows</SelectItem>
              <SelectItem value="keyword">Keyword</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <DialogTitle className="sr-only">Search</DialogTitle>
              <DialogDescription className="sr-only">
                Search for movies, tv shows, people and more...
              </DialogDescription>
              <Input
                aria-label="query"
                className="placeholder:text-sm"
                name="query"
                placeholder="Search Film Snail"
                onChange={debounce(handleChange, 300)}
                ref={inputRef}
                autoFocus
              />
              <button className="sr-only" type="submit">
                Search
              </button>
            </form>
            <DialogClose className="p-2">
              <IconX className="h-6 w-6" />
            </DialogClose>
          </div>
        </DialogHeader>
        {"data" in results &&
          typeof results.data === "object" &&
          results.data &&
          "results" in results.data &&
          Array.isArray(results.data.results) &&
          results.data.results.length > 0 && (
            <div className="flex h-[calc(100dvh-71px)] flex-col gap-2 overflow-y-scroll">
              {results.data.results.map((item) => (
                <SearchResult
                  key={item.id}
                  item={item}
                  handleClick={handleClick}
                />
              ))}
              <div className="flex justify-center">
                <Button asChild>
                  <Link
                    href={`/search?query=${encodeURIComponent(
                      inputRef.current?.value || "",
                    )}`}
                    onClick={handleClick}
                  >
                    See all results
                  </Link>
                </Button>
              </div>
            </div>
          )}
        {"data" in results &&
          typeof results.data === "object" &&
          results.data &&
          "results" in results.data &&
          Array.isArray(results.data.results) &&
          results.data.results.length === 0 && (
            <div className="flex h-[calc(100dvh-71px)] flex-col gap-2 overflow-y-scroll text-center">
              No results found
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
}
