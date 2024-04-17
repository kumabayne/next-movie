import clsx from "clsx";
import { MovieDetails } from "../types/movie";
import {
  convertLanguageCodeToFullName,
  convertNumberToDollars,
} from "../utils/helpers";

export default function Facts({
  className,
  data,
}: {
  className?: string;
  data: MovieDetails;
}) {
  return (
    <div className={clsx("gap-2 grid grid-cols-2", className && className)}>
      <div>
        <p className="font-medium text-sm text-zinc-100">Status:</p>
        <p className="text-sm text-zinc-400">{data.status}</p>
      </div>
      <div>
        <p className="font-medium text-sm text-zinc-100">Original Language:</p>
        <p className="text-sm text-zinc-400">
          {convertLanguageCodeToFullName(
            data.original_language,
            data.spoken_languages
          )}
        </p>
      </div>
      <div>
        <p className="font-medium text-sm text-zinc-100">Budget:</p>
        <p className="text-sm text-zinc-400">
          {convertNumberToDollars(data.budget)}
        </p>
      </div>
      <div>
        <p className="font-medium text-sm text-zinc-100">Revenue:</p>
        <p className="text-sm text-zinc-400">
          {convertNumberToDollars(data.revenue)}
        </p>
      </div>
    </div>
  );
}
