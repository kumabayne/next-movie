import Image from "next/image";
import { Cast, Crew } from "../types/people";
import { configuration } from "@/utils/data";
import Link from "next/link";
import { slugify } from "@/utils/helpers";
import { TbUserFilled } from "react-icons/tb";
import clsx from "clsx";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Person({
  grid,
  person,
}: {
  grid?: boolean | null;
  person: Cast | Crew;
}) {
  return (
    <Link
      className={clsx("items-center", {
        "relative block lg:w-[120px]": !grid,
        "grid grid-cols-[67px_1fr_auto] gap-2 lg:grid-cols-[80px_1fr_auto]":
          grid,
      })}
      href={`/person/${person.id}/${slugify(person.name)}`}
      key={person.id}
    >
      <div
        className={clsx({
          "aspect-square w-20 overflow-hidden rounded-full lg:aspect-auto lg:h-[180px] lg:w-[120px] lg:rounded-sm":
            !grid,
          "flex items-center justify-center border border-zinc-800 bg-zinc-700/40 lg:border-none":
            !grid || !person.profile_path,
          "h-[100px] w-[67px] shrink-0 rounded-sm lg:h-[120px] lg:w-[80px]":
            !person.profile_path && grid,
        })}
      >
        {person.profile_path ? (
          <Image
            className={clsx({
              "object-cover object-[0_8px] lg:rounded-sm lg:object-fill lg:object-[0_0]":
                !grid,
              "rounded-sm": grid,
            })}
            src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[2]}${person.profile_path}`}
            width="120"
            height="180"
            loading="lazy"
            alt={person.name}
          />
        ) : (
          <TbUserFilled
            data-testid="avatar"
            className="h-6 w-6 text-zinc-500 lg:h-12 lg:w-12"
          />
        )}
      </div>
      <div className={clsx({ "lg:mt-2": true, grow: grid })}>
        <p
          className={clsx("text-xs text-white", {
            "line-clamp-2 text-center": !grid,
            "lg:text-base": grid,
          })}
        >
          {person.name}
        </p>
        <p
          className={clsx("text-xs text-zinc-500", {
            "line-clamp-1 text-center": !grid,
            "lg:text-sm": grid,
          })}
        >
          {"character" in person ? person.character : person.job}
        </p>
      </div>
      {grid && (
        <IconInfoCircle
          data-testid="information"
          className="h-6 w-6 text-zinc-600"
        />
      )}
    </Link>
  );
}
