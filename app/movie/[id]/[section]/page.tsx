import Container from "@/src/components/Container";
import Reviews from "@/src/components/Reviews";
import { Reviews as ReviewsType } from "@/src/types/reviews";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`;

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

export default async function MoviePage({
  params,
}: {
  params: { id: string; section: string };
}) {
  const id = params.id;
  const data: ReviewsType = await getData(id);

  return (
    <main className="pt-16 lg:pt-6">
      <Container>
        <Link
          className="flex gap-2 items-center mb-2 text-sm text-zinc-400"
          href={`/movie/${id}`}
        >
          <ArrowLongLeftIcon className="h-4 w-4" />
          Back to movie
        </Link>
        <h1 className="font-semibold mb-2 text-xl text-zinc-100">Reviews</h1>
        <Reviews data={data} />
      </Container>
    </main>
  );
}
