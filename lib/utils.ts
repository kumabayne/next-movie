import { CrewType } from "@/types/people";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function crewFilter() {}

export function crewReduce(crew: CrewType[]) {
  return crew.reduce((prev: { [key: string]: CrewType }, current) => {
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
  }, {});
}

export function crewSort(crew: CrewType[]) {
  return crew
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
}

export const debounce = (
  callback: (args?: any[] | any | undefined) => any,
  wait: number,
) => {
  let timeoutId: number | undefined;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...(args as []));
    }, wait);
  };
};

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
