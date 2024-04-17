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
        "flex flex-col w-20": !grid,
        "gap-2 grid grid-cols-person mb-2": grid,
      })}
      href={`/person/${person.id}/${slugify(person.name)}`}
      key={person.id}
    >
      <div
        className={clsx({
          "aspect-square h-20 mb-0.5 rounded-full overflow-hidden w-20": !grid,
          "bg-zinc-700/40 border border-zinc-800 flex items-center justify-center":
            !grid || !person.profile_path,
          "h-[100px] rounded-sm shrink-0 w-[67px]":
            !person.profile_path && grid,
        })}
      >
        {person.profile_path ? (
          <Image
            className={clsx({
              "object-cover object-[0_8px] mb-0.5": !grid,
              "rounded-sm": grid,
            })}
            src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[1]}${person.profile_path}`}
            width={grid ? "67" : "120"}
            height={grid ? "100" : "80"}
            loading="lazy"
            alt={person.name}
          />
        ) : (
          <TbUserFilled
            data-testid="avatar"
            className="h-10 text-zinc-500/80 w-10"
          />
        )}
      </div>
      <div className={clsx({ grow: grid })}>
        <p
          className={clsx("text-xs text-zinc-200", {
            "line-clamp-2 text-center": !grid,
          })}
        >
          {person.name}
        </p>
        <p
          className={clsx("text-xs text-zinc-400", {
            "line-clamp-1 text-center": !grid,
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
