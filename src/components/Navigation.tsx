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
    <Disclosure as="nav" className="bg-zinc-950/40 mb-4 py-2 shadow-sm sm:py-4">
      {({ open }) => (
        <>
          <Container className="flex gap-2 items-center justify-between sm:gap-4">
            <Logo />
            <Search />
            <Disclosure.Button
              className="relative inline-flex items-center justify-center rounded-md p-1 text-zinc-200 hover:bg-zinc-100/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              data-testid="menu"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XMarkIcon
                  data-testid="close"
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <Bars3BottomRightIcon
                  data-testid="hamburger"
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </Disclosure.Button>
          </Container>
          <Disclosure.Panel data-testid="mobile-nav" className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-zinc-100/10 text-white"
                      : "text-zinc-200 hover:bg-zinc-100/10 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
