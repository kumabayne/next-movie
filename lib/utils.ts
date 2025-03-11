import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (
  callback: (args?: any[] | any | undefined) => any,
  wait: number
) => {
  let timeoutId: number | undefined;

  return (...args: any[]) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...(args as []));
    }, wait);
  };
};
