"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Logo from "./Logo";
import Container from "./Container";
import Search from "./Search";

const navigation = [
  { name: "Movies", href: "#", current: true },
  { name: "TV Shows", href: "#", current: false },
  { name: "People", href: "#", current: false },
];

export default function Navigation() {
  return (
    <div className="bg-zinc-950/40 py-2 shadow-sm sm:py-4 md:mb-0">
      <Container className="flex gap-2 items-center justify-between sm:gap-4">
        <Logo />
        <Search />
      </Container>
    </div>
  );
}
