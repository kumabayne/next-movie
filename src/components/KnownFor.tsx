import Image from "next/image";
import { Movie } from "../types/movie";
import { TVShow } from "../types/tv";
import { configuration } from "../utils/data";
import Link from "next/link";

export default function KnownFor({
  knownFor,
}: {
  knownFor: (Movie | TVShow)[];
}) {
  return (
    <div className="gap-2 grid grid-cols-4 mb-4">
      <h2 className="col-span-full font-semibold text-zinc-100">Known for</h2>
      {knownFor.map((item) => (
        <Link key={item.id} href={`/${item.media_type}/${item.id}`}>
          <Image
            className="mb-1 rounded-sm"
            src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[1]}${item.poster_path}`}
            width="154"
            height="231"
            alt={"title" in item ? item.title : item.name}
          />
          <h3 className="font-semibold line-clamp-2 text-xs text-zinc-200">
            {"title" in item ? item.title : item.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
