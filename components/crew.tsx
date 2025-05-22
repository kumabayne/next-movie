"use client";

import { useMemo } from "react";
import Typography from "@/components/typography";
import { CrewType } from "@/types/people";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight } from "@tabler/icons-react";
import { slugify } from "@/utils/helpers";

export default function Crew({
  className,
  createdBy,
  crew,
  mediaType,
}: {
  className?: string;
  createdBy?: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  crew: CrewType[];
  mediaType?: string;
}) {
  const pathname = usePathname();
  const sortedCrew = crew
    .slice()
    .sort((a, b) => {
      if (a.job && b.job) {
        return a.job.localeCompare(b.job);
      } else if ("jobs" in a && "jobs" in b && a.jobs && b.jobs) {
        return a.jobs[0].job.localeCompare(b.jobs[0].job);
      } else {
        return 0;
      }
    })
    .sort((a, b) => a.department.localeCompare(b.department));

  const directorsAndWriters = useMemo(() => {
    if (mediaType === "movie") {
      const filteredCrew = sortedCrew.filter(
        (person) =>
          person.job === "Director" ||
          (person.department === "Writing" &&
            person.job !== "Story Supervisor" &&
            person.job !== "Storyboard"),
      );
      const reducedCrew = filteredCrew.reduce(
        (prev: { [key: string]: CrewType }, current) => {
          if (current.id in prev) {
            return {
              ...prev,
              [current.id]: {
                ...prev[current.id],
                job: `${prev[current.id].job}, ${current.job}`,
              },
            };
          }
          return {
            ...prev,
            [current.id]: current,
          };
        },
        {},
      );

      const directorsAndWriters: CrewType[] | [] = Object.values(reducedCrew);
      const sortedDirectorsAndWriters = directorsAndWriters
        .sort((a, b) => a.job.localeCompare(b.job))
        .sort((a, b) => a.department.localeCompare(b.department));

      return sortedDirectorsAndWriters;
    } else {
      return [];
    }
  }, [mediaType, sortedCrew]);

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link href={`${pathname}/credits`}>
          <Typography as="h2" className="flex items-center gap-1">
            Crew
            <IconChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
          </Typography>
        </Link>
      </div>
      {directorsAndWriters.length > 0 &&
        directorsAndWriters.map((person) => (
          <Link
            key={person.id}
            className="flex justify-between gap-2 border-b py-2 transition-colors duration-300 ease-in-out hover:bg-white/10 xl:px-2"
            href={`/person/${person.id}/${slugify(person.name)}`}
          >
            <p className="text-sm font-medium text-white xl:text-base">
              {person.job}
            </p>
            <p className="text-sm font-medium text-neutral-400 xl:text-base">
              {person.name}
            </p>
          </Link>
        ))}
      {mediaType === "tvshow" &&
        createdBy &&
        createdBy.length > 0 &&
        createdBy.map((person) => (
          <Link
            key={person.id}
            className="flex justify-between gap-2 border-b py-2 transition-colors duration-300 ease-in-out hover:bg-white/10 xl:px-2"
            href={`/person/${person.id}/${slugify(person.name)}`}
          >
            <p className="text-sm text-zinc-200 xl:text-base">Creator</p>
            <p className="text-sm text-zinc-400 xl:text-base">{person.name}</p>
          </Link>
        ))}
    </div>
  );
}
