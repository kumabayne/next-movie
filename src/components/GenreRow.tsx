import { Genre } from "../types/genre";
import GenreCard from "./GenreCard";
import Swiper from "./Swiper";

export default function GenreRow({
  genres,
  title,
}: {
  genres: Genre[];
  title?: string;
}) {
  return (
    <>
      {title && <h2 className="font-semibold mb-2 text-zinc-100">{title}</h2>}
      <Swiper
        params={{
          slidesPerView: "auto",
          spaceBetween: 8,
        }}
      >
        {genres.map((item: Genre) => (
          <swiper-slide
            key={item.id}
            style={{ flexShrink: "1", width: "auto" }}
          >
            <GenreCard key={item.id} item={item} />
          </swiper-slide>
        ))}
      </Swiper>
    </>
  );
}
