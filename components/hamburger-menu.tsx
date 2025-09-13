"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconDeviceRemote,
  IconDeviceTvOld,
  IconHome,
  IconMenu3,
  IconMovie,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2">
        <IconMenu3 className="h-6 w-6" />
        <span className="sr-only">Open Menu</span>
      </SheetTrigger>
      <SheetContent className="border-black/10 bg-black/60 pt-12" side="left">
        <div className="flex h-full flex-col justify-between gap-2">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription
            className="sr-only"
            data-testid="hamburger-menu-description"
          >
            Open the sections below to access links for movies, tv shows, people
            and more...
          </SheetDescription>
          <div>
            <Link
              className="flex gap-2 border-b py-2"
              href="/"
              onClick={() => setOpen(false)}
            >
              <span>
                <IconHome className="h-6 w-6" />
              </span>
              Home
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="watch-now">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex gap-2">
                    <IconDeviceRemote className="h-6 w-6" stroke="1.5" /> Watch
                    Now
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        In Theaters
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Streaming
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        On TV
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        For Rent
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="movies">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex gap-2">
                    <IconMovie className="h-6 w-6" stroke="1.5" /> Movies
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        In Theaters
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Popular
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Top Rated
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Coming Soon
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tv-shows">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex gap-2">
                    <IconDeviceTvOld className="h-6 w-6" stroke="1.5" /> TV
                    Shows
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        On TV
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Listings
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Popular
                      </Link>
                    </li>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Top Rated
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-b-0" value="people">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex gap-2">
                    <IconUsers className="h-6 w-6" stroke="1.5" /> People
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <li>
                      <Link className="block py-2 pl-8 pr-2" href="/movies">
                        Popular
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
