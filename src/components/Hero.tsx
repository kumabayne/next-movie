import HeroCard from "./HeroCard";
import Swiper from "./Swiper";
import { Movie } from "../types/movie";
import Container from "./Container";

async function getData(category: string) {
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

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

export default async function Hero({
  category,
  title,
}: {
  category: string;
  title: string;
}) {
  const data = await getData(category);

  return (
    <div className="mb-6 relative md:px-0">
      <Swiper
        params={{
          autoplay: {
            delay: 4500,
            disableOnInteraction: false,
          },
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        }}
      >
        {data.results.map((item: Movie) => (
          <swiper-slide key={item.id} lazy="true" style={{ width: "100%" }}>
            <HeroCard key={item.id} item={item} title={title} />
          </swiper-slide>
        ))}
      </Swiper>
      <Container>
        <h1 className="font-bold mb-2 text-2xl text-zinc-100 md:hidden">
          {title}
        </h1>
      </Container>
    </div>
  );
}
