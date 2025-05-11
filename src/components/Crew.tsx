"use client";

import { Fragment, useMemo } from "react";
import { CrewType } from "../../types/people";
import Person from "../../components/person";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Typography from "@/components/typography";

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
  const departments: { [key: string]: number } = {};
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
  const departmentReduced = useMemo(() => {
    const reducedCrew = crew.reduce(
      (prev: { [key: string]: CrewType }, current) => {
        if (
          `${current.id}-${current.department}` in prev &&
          prev[`${current.id}-${current.department}`].department ===
            current.department
        ) {
          return {
            ...prev,
            [`${current.id}-${current.department}`]: {
              ...prev[`${current.id}-${current.department}`],
              job: `${prev[`${current.id}-${current.department}`].job}, ${
                current.job
              }`,
            },
          };
        }
        return {
          ...prev,
          [`${current.id}-${current.department}`]: current,
        };
      },
      {},
    );

    const squashedCrew: CrewType[] | [] = Object.values(reducedCrew);
    const sortedCrew = squashedCrew
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

    return sortedCrew || [];
  }, [crew]);

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
        <Typography as="h2">Crew</Typography>
        <Dialog>
          <DialogTrigger className="text-sm font-medium text-primary">
            See All
          </DialogTrigger>
          <DialogContent className="crew-dialog max-w-[90%] p-6">
            <div className="max-h-[80svh] overflow-scroll">
              <div className="grid md:grid-cols-2 lg:max-h-[600px] xl:grid-cols-3 2xl:grid-cols-4">
                {departmentReduced.map((item: CrewType, idx, dept) => {
                  if (item.department in departments) {
                    if (idx === 1) {
                      return (
                        <Fragment key={`${item.id}-${idx}`}>
                          <div className="py-4">
                            <Person grid={true} person={dept[0]} />
                          </div>
                          <div className="py-4">
                            <Person grid={true} person={item} />
                          </div>
                        </Fragment>
                      );
                    }

                    return (
                      <div key={`${item.id}-${idx}`} className="py-4">
                        <Person grid={true} person={item} />
                      </div>
                    );
                  } else {
                    departments[item.department] = 1;
                    if (dept[1].department !== item.department) {
                      return (
                        <Fragment key={`${item.id}-${idx}`}>
                          <Typography as="h3" className="col-span-full mt-6">
                            {item.department}
                          </Typography>
                          <div className="py-4">
                            <Person grid={true} person={item} />
                          </div>
                        </Fragment>
                      );
                    }
                    return (
                      <Typography
                        className="col-span-full"
                        as="h3"
                        key={`${item.id}-${idx}`}
                      >
                        {item.department}
                      </Typography>
                    );
                  }
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {directorsAndWriters.length > 0 &&
        directorsAndWriters.map((person) => (
          <div key={person.id} className="flex justify-between gap-2 py-2">
            <p className="text-sm font-medium text-white">{person.job}</p>
            <p className="text-sm font-medium text-neutral-400">
              {person.name}
            </p>
          </div>
        ))}
      {mediaType === "tvshow" &&
        createdBy &&
        createdBy.length > 0 &&
        createdBy.map((person) => (
          <div key={person.id} className="flex justify-between gap-2 py-2">
            <p className="text-sm text-zinc-200">Creator</p>
            <p className="text-sm text-zinc-400">{person.name}</p>
          </div>
        ))}
    </div>
  );
}
