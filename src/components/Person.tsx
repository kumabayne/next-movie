import Image from "next/image";
import { Cast, Crew } from "../types/people";
import { configuration } from "../utils/data";
import Link from "next/link";
import { slugify } from "../utils/helpers";
import { TbUserFilled } from "react-icons/tb";
import clsx from "clsx";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
        "gap-2 grid grid-cols-[67px_1fr_auto] lg:grid-cols-[80px_1fr_auto]":
          grid,
      })}
      href={`/person/${person.id}/${slugify(person.name)}`}
      key={person.id}
    >
      <div
        className={clsx({
          "aspect-square rounded-full overflow-hidden w-20 lg:aspect-auto lg:rounded-sm lg:h-[180px] lg:w-[120px]":
            !grid,
          "bg-zinc-700/40 border border-zinc-800 flex items-center justify-center lg:border-none":
            !grid || !person.profile_path,
          "h-[100px] rounded-sm shrink-0 w-[67px] lg:w-[80px] lg:h-[120px]":
            !person.profile_path && grid,
        })}
      >
        {person.profile_path ? (
          <Image
            className={clsx({
              "object-cover object-[0_8px] lg:object-fill lg:rounded-sm lg:object-[0_0]":
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
            className="h-6 text-zinc-500 w-6 lg:h-12 lg:w-12"
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
        <InformationCircleIcon
          data-testid="information"
          className="h-6 text-zinc-600 w-6"
        />
      )}
    </Link>
  );
}
