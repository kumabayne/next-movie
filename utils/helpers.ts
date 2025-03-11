import { DateTime } from "luxon";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

export const calculateAge = (
  dob: string,
  dod: string = DateTime.now().toString()
) => {
  const birthDate = DateTime.fromISO(dob);
  const dateOfDeath = DateTime.fromISO(dod);
  const age = dateOfDeath.diff(birthDate, ["years", "months", "days", "hours"]);

  return age.toObject().years;
};

export const convertLanguageCodeToFullName = (
  code: string,
  languages: { english_name: string; iso_639_1: string; name: string }[]
): string => {
  const language = languages.find((item) => item.iso_639_1 === code);

  return language?.english_name || "";
};

export const convertNumberToDollars = (num: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return `${formatter.format(num)}`;
};

export const formatDate = (isoDate: string) => {
  const date = DateTime.fromISO(isoDate);

  return `${months[date.month - 1]} ${date.day}, ${date.year}`;
};

export const slugify = (slug: string) => {
  return slug.toLowerCase().replaceAll(" ", "-");
};
