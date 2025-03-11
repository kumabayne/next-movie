import Image from "next/image";
import { configuration } from "@/utils/data";
import Container from "@/components/container";
import { Person } from "@/types/people";
import SearchResult from "@/components/search-result";
import { Movie } from "@/types/movie";

async function getData(query: string) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;

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

export default async function PersonPage(props: {
  params: Promise<{
    query: string;
  }>;
}) {
  const params = await props.params;
  const query = params.query;
  const data: { results: Movie[] } = await getData(query);

  return (
    <div className="py-4">
      <Container>
        <div className="flex flex-col gap-2">
          {data.results.map((item: Movie) => (
            <SearchResult key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
