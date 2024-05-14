import clsx from "clsx";
import { MovieDetails } from "../types/movie";
import {
  convertLanguageCodeToFullName,
  convertNumberToDollars,
} from "../utils/helpers";
import { TVShowDetails } from "../types/tv";
import Image from "next/image";
import { configuration } from "../utils/data";

export default function Facts({
  className,
  data,
}: {
  className?: string;
  data: MovieDetails | TVShowDetails;
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
      {"budget" in data && (
        <div>
          <p className="font-medium text-sm text-zinc-100">Budget:</p>
          {data.status !== "Released" ? (
            <p className="text-sm text-zinc-400">-</p>
          ) : (
            <p className="text-sm text-zinc-400">
              {convertNumberToDollars(data.budget)}
            </p>
          )}
        </div>
      )}
      {"type" in data && (
        <div>
          <p className="font-medium text-sm text-zinc-100">Type:</p>
          <p className="text-sm text-zinc-400">{data.type}</p>
        </div>
      )}
      {"revenue" in data && (
        <div>
          <p className="font-medium text-sm text-zinc-100">Revenue:</p>
          {data.status !== "Released" ? (
            <p className="text-sm text-zinc-400">-</p>
          ) : (
            <p className="text-sm text-zinc-400">
              {convertNumberToDollars(data.revenue)}
            </p>
          )}
        </div>
      )}
      {"networks" in data && (
        <div>
          <p className="font-medium text-sm text-zinc-100">Networks:</p>
          <div className="flex gap-2 items-center">
            {data.networks.map((network) => (
              <Image
                key={network.id}
                src={`${configuration.images.secure_base_url}/${configuration.images.logo_sizes[1]}/${network.logo_path}`}
                width="45"
                height="100"
                alt={network.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
