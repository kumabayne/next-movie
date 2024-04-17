"use client";

import { Fragment, useMemo, useState } from "react";
import { Crew as CrewType } from "../types/people";
import Modal from "./Modal";
import Person from "./Person";

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
  const [isOpen, setIsOpen] = useState(false);
  const departments: { [key: string]: number } = {};
  const sortedCrew = crew
    .slice()
    .sort((a, b) => {
      if (a.job && b.job) {
        return a.job.localeCompare(b.job);
      } else if ("jobs" in a && "jobs" in b) {
        return a.jobs[0].job.localeCompare(b.jobs[0].job);
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
      {}
    );

    const squashedCrew: CrewType[] | [] = Object.values(reducedCrew);
    const sortedCrew = squashedCrew
      .sort((a, b) => {
        if (a.job && b.job) {
          return a.job.localeCompare(b.job);
        } else if ("jobs" in a && "jobs" in b) {
          return a.jobs[0].job.localeCompare(b.jobs[0].job);
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
            person.job !== "Storyboard")
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
        {}
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
      <div className="flex gap-2 items-center justify-between mb-2">
        <h2 className="font-semibold text-zinc-100">Crew</h2>
        <button
          className="text-pink-500 text-sm"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          See All
        </button>
      </div>
      {directorsAndWriters.length > 0 &&
        directorsAndWriters.map((person) => (
          <div
            key={person.id}
            className="border-b border-zinc-600 flex gap-2 justify-between py-2 last:border-none"
          >
            <p className="text-sm text-zinc-200">{person.job}</p>
            <p className="text-sm text-zinc-400">{person.name}</p>
          </div>
        ))}
      {mediaType === "tvshow" &&
        createdBy.length > 0 &&
        createdBy.map((person) => (
          <div
            key={person.id}
            className="border-b border-zinc-600 flex gap-2 justify-between py-2 last:border-none"
          >
            <p className="text-sm text-zinc-200">Creator</p>
            <p className="text-sm text-zinc-400">{person.name}</p>
          </div>
        ))}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {departmentReduced.map((item: CrewType, idx) => {
          if (item.department in departments) {
            return (
              <div key={`${item.id}-${idx}`}>
                <Person grid={true} person={item} />
              </div>
            );
          } else {
            departments[item.department] = 1;

            return (
              <Fragment key={`${item.id}-${idx}`}>
                <h3 className="font-semibold mb-1 mt-4 text-sm text-zinc-100 first-of-type:mt-0">
                  {item.department}
                </h3>
                <div>
                  <Person grid={true} person={item} />
                </div>
              </Fragment>
            );
          }
        })}
      </Modal>
    </div>
  );
}
