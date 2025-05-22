// https://api.themoviedb.org/3/discover/movie?api_key=THE_KEY&language=en-US&sort_by=release_date.desc&page=1&with_genres=35,37,80

import Container from "@/components/container";
import Pagination from "@/components/pagination";
import SearchResult from "@/components/search-result";
import { MovieType } from "@/types/movie";

async function getData(genre: string, page: string, type: string) {
  const genreId = genre.split("-")[0];
  const url = `https://api.themoviedb.org/3/discover/${type}?language=en-US&sort_by=release_date.desc&page=${page}&with_genres=${genreId}`;

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

export default async function GenrePage(props: {
  params: Promise<{ genre: string; page: string; type: string }>;
}) {
  const params = await props.params;
  const genre = params.genre;
  const page = params.page;
  const type = params.type;
  const data: {
    page: number;
    results: MovieType[];
    total_pages: number;
    total_results: number;
  } = await getData(genre, page, type);

  return (
    <Container>
      <h1 className="mb-2 text-xl font-semibold text-zinc-100">
        {genre.split("-")[1]}
      </h1>
      <div className="mb-4 flex flex-col gap-2">
        {data.results.map((item: MovieType) => (
          <SearchResult key={item.id} item={item} type={type} />
        ))}
      </div>
      <div className="mb-4 flex justify-center">
        <Pagination
          genre={genre}
          page={page}
          total_pages={data.total_pages > 500 ? 500 : data.total_pages}
          type={type}
        />
      </div>
    </Container>
  );
}
