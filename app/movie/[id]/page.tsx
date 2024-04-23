import Container from "@/src/components/Container";
import { MovieDetails } from "@/src/types/movie";
import CastRow from "@/src/components/CastRow";
import GenreRow from "@/src/components/GenreRow";
import Crew from "@/src/components/Crew";
import MediaHero from "@/src/components/MediaHero";
import Review from "@/src/components/Review";
import Link from "next/link";
import Media from "@/src/components/Media";
import ExternalLinks from "@/src/components/ExternalLinks";
import Facts from "@/src/components/Facts";
import Keywords from "@/src/components/Keywords";
import Recommendations from "@/src/components/Recommendations";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos,external_ids,images,credits,keywords,release_dates,reviews,recommendations&include_image_language=en,null`;

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
  params: { id: string };
}) {
  const id = params.id;
  const data: MovieDetails = await getData(id);
  const rating = data.release_dates.results
    .filter((item) => item.iso_3166_1 === "US")[0]
    ?.release_dates.reduce(
      (prev, current) => (prev === "" ? prev + current.certification : prev),
      ""
    );
  const year = data.release_date.slice(0, 4);

  return (
    <Container>
      <MediaHero data={data} />
      <div className="mb-4">
        <h1 className="font-semibold mb-2 text-xl text-zinc-100">
          {data.title}
        </h1>
        <div className="flex gap-2 items-center mb-2 text-sm text-zinc-400">
          <span className="bg-zinc-100 font-semibold inline-flex items-center justify-center px-1 rounded-sm text-zinc-800 text-xs">
            {rating}
          </span>
          <span className="font-semibold">&middot;</span>
          <span>{year}</span>
          <span className="font-semibold">&middot;</span>
          <span>{data.runtime}m</span>
        </div>
        <div className="mb-2">
          <GenreRow genres={data.genres} />
        </div>
        <ExternalLinks
          externalIds={data.external_ids}
          homepage={data.homepage}
        />
      </div>
      <div className="mb-4">
        <h2 className="font-medium text-zinc-400 text-xs">Summary</h2>
        <p className="text-zinc-200">{data.overview}</p>
      </div>
      <CastRow cast={data.credits.cast} className="mb-4" />
      {data.credits.crew.length > 0 && (
        <Crew className="mb-4" crew={data.credits.crew} mediaType="movie" />
      )}
      <div className="mb-4">
        <div className="mb-2">
          <h2 className="font-semibold text-zinc-100">Reviews</h2>
        </div>
        <Review review={data.reviews.results[0]} />
        <div className="flex justify-end mt-2">
          <Link className="text-pink-500 text-sm" href={`${id}/reviews`}>
            Read More Reviews
          </Link>
        </div>
      </div>
      <Media className="mb-4" images={data.images} videos={data.videos} />
      <Facts className="mb-4" data={data} />
      <Keywords className="mb-4" keywords={data.keywords} />
      <Recommendations recommendations={data.recommendations} />
    </Container>
  );
}
