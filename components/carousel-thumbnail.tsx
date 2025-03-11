import { MovieType } from "@/types/movie";
import { configuration } from "@/utils/data";
import Image from "next/image";
import Rating from "./rating";
import { formatDate } from "@/utils/helpers";

export default function CarouselThumbnail({
  current,
  handleClick,
  height,
  index,
  item,
}: {
  current: number;
  handleClick: (index: number) => void;
  height: number;
  index: number;
  item: MovieType;
}) {
  return (
    <button
      className="grid gap-2"
      onClick={() => handleClick(index)}
      style={{
        gridTemplateColumns: `${((height - 24) / 4) * (500 / 750)}px 1fr`,
      }}
    >
      <Image
        alt={item.title}
        className="rounded-xl drop-shadow"
        height="384"
        src={`${configuration.images.secure_base_url}${configuration.images.poster_sizes[4]}${item.poster_path}`}
        width="256"
      />
      <div className="py-2">
        <h2 className="font-medium">{item.title}</h2>
        <p className="text-sm text-gray-500">{formatDate(item.release_date)}</p>
        <div>
          <Rating rating={item.vote_average} />
        </div>
      </div>
    </button>
  );
}
