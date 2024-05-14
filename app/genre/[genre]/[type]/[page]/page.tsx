// https://api.themoviedb.org/3/discover/movie?api_key=THE_KEY&language=en-US&sort_by=release_date.desc&page=1&with_genres=35,37,80

import Container from "@/src/components/Container";
import Pagination from "@/src/components/Pagination";
import SearchResult from "@/src/components/SearchResult";
import { Movie } from "@/src/types/movie";

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

export default async function GenrePage({
  params,
}: {
  params: { genre: string; page: string; type: string };
}) {
  const genre = params.genre;
  const page = params.page;
  const type = params.type;
  const data: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  } = await getData(genre, page, type);

  return (
    <Container>
      <h1 className="font-semibold mb-2 text-xl text-zinc-100">
        {genre.split("-")[1]}
      </h1>
      <div className="flex flex-col gap-2 mb-4">
        {data.results.map((item: Movie) => (
          <SearchResult key={item.id} item={item} type={type} />
        ))}
      </div>
      <div className="flex justify-center mb-4">
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
