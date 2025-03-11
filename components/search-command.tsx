"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { DialogDescription, DialogTitle } from "./ui/dialog";
import { IconSearch } from "@tabler/icons-react";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen((open) => !open);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button className="p-2" onClick={handleClick} type="button">
        <IconSearch className="w-6 h-6" />{" "}
      </button>
      <Command shouldFilter={false}>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search for movies, tv shows and people..." />
          <CommandList>
            <DialogTitle className="sr-only">
              Search for movies, tv shows and people
            </DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </>
  );
}
