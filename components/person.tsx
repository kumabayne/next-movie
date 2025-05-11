import Image from "next/image";
import { Cast, Crew } from "../types/people";
import { configuration } from "@/utils/data";
import Link from "next/link";
import { slugify } from "@/utils/helpers";
import { IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function Person({
  person,
  variant = "vertical",
}: {
  person: Cast | Crew;
  variant?: "vertical" | "horizontal";
}) {
  return (
    <Link
      className={cn(
        "relative space-y-1",
        variant === "horizontal" &&
          "grid grid-cols-[64px_1fr] items-center gap-2",
      )}
      href={`/person/${person.id}/${slugify(person.name)}`}
      key={person.id}
    >
      <div className="rounded-xl">
        {person.profile_path ? (
          <Image
            className="rounded-xl"
            src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[2]}${person.profile_path}`}
            width="421"
            height="632"
            loading="lazy"
            alt={person.name}
          />
        ) : (
          <div className="flex aspect-[421/632] items-center justify-center rounded-xl bg-neutral-900">
            <IconUser
              data-testid="mediacard-icon"
              className={cn(
                variant === "vertical" && "h-12 w-12",
                variant === "horizontal" && "h-8 w-8",
              )}
              stroke="1.5"
            />
          </div>
        )}
      </div>
      <div className="lg:mt-2">
        <p
          className={cn(
            "font-medium text-white",
            variant === "vertical" && "text-center text-sm",
            variant === "horizontal" && "text-base",
          )}
        >
          {person.name}
        </p>
        <p
          className={cn(
            "text-sm font-medium text-neutral-400",
            variant === "vertical" && "text-center",
          )}
        >
          {"character" in person ? person.character : person.job}
        </p>
      </div>
    </Link>
  );
}
