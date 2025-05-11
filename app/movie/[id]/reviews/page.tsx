import Container from "@/components/container";
import Reviews from "@/src/components/Reviews";
import { Reviews as ReviewsType } from "@/types/reviews";
import { IconChevronLeft } from "@tabler/icons-react";
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

export default async function MovieReviewsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const data: ReviewsType = await getData(id);

  return (
    <main className="pt-16 lg:pt-6">
      <Container>
        <Link
          className="mb-2 flex items-center gap-2 text-sm text-zinc-400"
          href={`/movie/${id}`}
        >
          <IconChevronLeft className="h-4 w-4" />
          Back to movie
        </Link>
        <h1 className="mb-2 text-xl font-semibold text-zinc-100">Reviews</h1>
        <Reviews data={data} />
      </Container>
    </main>
  );
}
