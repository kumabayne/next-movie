"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Icon,
  IconCalendar,
  IconCast,
  IconDeviceProjector,
  IconDeviceTv,
  IconFlame,
  IconHelpSquareRounded,
  IconProps,
  IconStar,
  IconTheater,
} from "@tabler/icons-react";

const movies: {
  title: string;
  href: string;
  description: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}[] = [
  {
    title: "In Theaters",
    href: "/movies/now_playing",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    Icon: IconTheater,
  },
  {
    title: "Popular",
    href: "/movies/popular",
    description:
      "For sighted users to preview content available behind a link.",
    Icon: IconFlame,
  },
  {
    title: "Top Rated",
    href: "/movies/top_rated",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    Icon: IconStar,
  },
  {
    title: "Coming Soon",
    href: "/movies/upcoming",
    description: "Visually or semantically separates content.",
    Icon: IconCalendar,
  },
];

const tv: {
  title: string;
  href: string;
  description: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
}[] = [
  {
    title: "On TV",
    href: "/tv/airing_today",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    Icon: IconDeviceTv,
  },
  {
    title: "Listings",
    href: "/tv/on_the_air",
    description:
      "For sighted users to preview content available behind a link.",
    Icon: IconHelpSquareRounded,
  },
  {
    title: "Popular",
    href: "/tv/popular",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    Icon: IconFlame,
  },
  {
    title: "Top Rated",
    href: "/tv/top_rated",
    description: "Visually or semantically separates content.",
    Icon: IconStar,
  },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Watch Now</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[772px] lg:grid-cols-[.75fr_1fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/movies/now_playing"
                title="In Theaters"
                Icon={IconTheater}
              >
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem
                href="/streaming/movies"
                title="Streaming"
                Icon={IconCast}
              >
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem
                href="/tv/airing_today"
                title="On TV"
                Icon={IconDeviceTv}
              >
                Styles for headings, paragraphs, lists...etc
              </ListItem>
              <ListItem
                href="/movies/rentals"
                title="Rent"
                Icon={IconDeviceProjector}
              >
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {movies.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                  Icon={category.Icon}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>TV Shows</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {tv.map((category) => (
                <ListItem
                  key={category.title}
                  title={category.title}
                  href={category.href}
                  Icon={category.Icon}
                >
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/people" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              People
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    Icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<Icon>
    >;
  }
>(({ className, title, Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-1 text-sm font-medium leading-none">
            <Icon className="h-4 w-4" />
            <span>{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
