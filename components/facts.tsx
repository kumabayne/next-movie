import clsx from "clsx";
import { MovieDetails } from "../types/movie";
import {
  convertLanguageCodeToFullName,
  convertNumberToDollars,
} from "../utils/helpers";
import { TVShowDetails } from "../types/tv";
import Image from "next/image";
import { configuration } from "@/utils/data";

export default function Facts({
  className,
  data,
}: {
  className?: string;
  data: MovieDetails | TVShowDetails;
}) {
  return (
    <div className={clsx("grid grid-cols-2 gap-2", className && className)}>
      <div>
        <p className="text-sm font-medium text-white">Status:</p>
        <p className="text-sm font-medium text-neutral-400">{data.status}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-white">Original Language:</p>
        <p className="text-sm font-medium text-neutral-400">
          {convertLanguageCodeToFullName(
            data.original_language,
            data.spoken_languages,
          )}
        </p>
      </div>
      {"budget" in data && (
        <div>
          <p className="text-sm font-medium text-white">Budget:</p>
          {data.status !== "Released" ? (
            <p className="text-sm font-medium text-neutral-400">-</p>
          ) : (
            <p className="text-sm font-medium text-neutral-400">
              {convertNumberToDollars(data.budget)}
            </p>
          )}
        </div>
      )}
      {"type" in data && (
        <div>
          <p className="text-sm font-medium text-white">Type:</p>
          <p className="text-sm font-medium text-neutral-400">{data.type}</p>
        </div>
      )}
      {"revenue" in data && (
        <div>
          <p className="text-sm font-medium text-white">Revenue:</p>
          {data.status !== "Released" ? (
            <p className="text-sm font-medium text-neutral-400">-</p>
          ) : (
            <p className="text-sm font-medium text-neutral-400">
              {convertNumberToDollars(data.revenue)}
            </p>
          )}
        </div>
      )}
      {"networks" in data && (
        <div>
          <p className="text-sm font-medium text-white">Networks:</p>
          <div className="flex items-center gap-2">
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
