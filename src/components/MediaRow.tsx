import Container from "@/src/components/Container";
import MediaCard from "@/src/components/MediaCard";
import Swiper from "@/src/components/Swiper";
import { Movie } from "../types/movie";
import { TVShow } from "../types/tv";
import { Person } from "../types/people";

async function getData(query: string) {
  const url = `https://api.themoviedb.org/3/${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MediaRow({
  query,
  heading,
}: {
  query: string;
  heading: string;
}) {
  const data = await getData(query);

  return (
    <Container className="mb-6">
      <h2 className="font-semibold mb-2 text-zinc-100 md:text-2xl md:font-bold">
        {heading}
      </h2>
      <Swiper
        params={{
          injectStyles: [
            `
              .swiper-lazy-preloader {
                display: none;
              }
            `,
          ],
          slidesPerView: "auto",
        }}
      >
        {data.results.map((item: Movie | Person | TVShow) => (
          // @ts-ignore
          <swiper-slide class="MovieSlide" key={item.id} lazy="true">
            <MediaCard key={item.id} item={item} />
          </swiper-slide>
        ))}
      </Swiper>
    </Container>
  );
}
