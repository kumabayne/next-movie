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
    href: "/movies/now-playing",
    description: "Check out the latest movies in theaters now.",
    Icon: IconTheater,
  },
  {
    title: "Popular",
    href: "/movies/popular",
    description: "Find out what everyone is talking about. Or...don't.",
    Icon: IconFlame,
  },
  {
    title: "Top Rated",
    href: "/movies/top-rated",
    description: "Who gave this 5 stars?",
    Icon: IconStar,
  },
  {
    title: "Coming Soon",
    href: "/movies/upcoming",
    description: "Find the next Marvel movie to watch.",
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
    href: "/tv/airing-today",
    description: "Do people still watch Tv? Find out what's on now.",
    Icon: IconDeviceTv,
  },
  {
    title: "Listings",
    href: "/tv/on-the-air",
    description: "Missed the latest episode? Never miss an episode again.",
    Icon: IconHelpSquareRounded,
  },
  {
    title: "Popular",
    href: "/tv/popular",
    description: "I need something to talk about at work tomorrow.",
    Icon: IconFlame,
  },
  {
    title: "Top Rated",
    href: "/tv/top-rated",
    description:
      "I still don't know who Walter White is and at this point I'm too afraid to ask.",
    Icon: IconStar,
  },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full bg-transparent hover:!bg-white/10">
            Watch Now
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                className="hover:bg-white/10"
                href="/movies/now-playing"
                title="In Theaters"
                Icon={IconTheater}
              >
                Check out the latest movies in theaters now.
              </ListItem>
              <ListItem
                className="hover:bg-white/10"
                href="/movies/streaming"
                title="Streaming"
                Icon={IconCast}
              >
                Bored? Discover new movies to watch at home or on the go.
              </ListItem>
              <ListItem
                className="hover:bg-white/10"
                href="/tv/airing-today"
                title="On TV"
                Icon={IconDeviceTv}
              >
                Do people still watch Tv? Find out what&apos;s on now.
              </ListItem>
              <ListItem
                className="hover:bg-white/10"
                href="/movies/rentals"
                title="Rent"
                Icon={IconDeviceProjector}
              >
                Want to watch a movie once and not own it? Rent it.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-full bg-transparent hover:!bg-white/10">
            Movies
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {movies.map((category) => (
                <ListItem
                  className="hover:bg-white/10"
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
          <NavigationMenuTrigger className="rounded-full bg-transparent hover:!bg-white/10">
            TV Shows
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {tv.map((category) => (
                <ListItem
                  className="hover:bg-white/10"
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
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "rounded-full bg-transparent hover:!bg-white/10",
              )}
            >
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
