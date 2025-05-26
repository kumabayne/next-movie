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
    href: "/movies/top_rated",
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
    href: "/tv/airing_today",
    description: "Do people still watch Tv? Find out what's on now.",
    Icon: IconDeviceTv,
  },
  {
    title: "Listings",
    href: "/tv/on_the_air",
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
    href: "/tv/top_rated",
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
          <NavigationMenuTrigger>Watch Now</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {/* <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #fc5c7d, #6a82fb)",
                    }}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li> */}
              <ListItem
                href="/movies/now_playing"
                title="In Theaters"
                Icon={IconTheater}
              >
                Check out the latest movies in theaters now.
              </ListItem>
              <ListItem
                href="/streaming/movies"
                title="Streaming"
                Icon={IconCast}
              >
                Bored? Discover new movies to watch at home or on the go.
              </ListItem>
              <ListItem
                href="/tv/airing_today"
                title="On TV"
                Icon={IconDeviceTv}
              >
                Do people still watch Tv? Find out what&apos;s on now.
              </ListItem>
              <ListItem
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
