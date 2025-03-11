import Container from "@/components/container";
import { MovieDetails } from "@/types/movie";
import CastRow from "@/src/components/CastRow";
import GenreRow from "@/components/genre-row";
import Crew from "@/src/components/Crew";
import MediaHero from "@/components/media-hero";
import Review from "@/components/review";
import Link from "next/link";
import Media from "@/components/media";
import ExternalLinks from "@/src/components/ExternalLinks";
import Facts from "@/components/facts";
import Keywords from "@/src/components/Keywords";
import Recommendations from "@/src/components/Recommendations";
import Rating from "@/components/rating";
import Image from "next/image";
import { configuration } from "@/utils/data";
import Watchlist from "@/components/watchlist";
import Favorite from "@/components/favorite";

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

export default async function MoviePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const data: MovieDetails = await getData(id);

  return (
    <>
      <div className="relative after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent lg:max-h-[600px]">
        <MediaHero data={data} />
      </div>
      <Container>
        <div className="mb-2 flex gap-2 md:hidden">
          <Watchlist />
          <Favorite />
        </div>
        <div className="mb-2 md:hidden">
          <GenreRow genres={data.genres} media={true} />
        </div>
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="col-span-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">Summary</h2>
              <p className="text-white">{data.overview}</p>
            </div>
            <CastRow cast={data.credits.cast} className="mb-4" />
            {data.credits.crew.length > 0 && (
              <Crew
                className="mb-4"
                crew={data.credits.crew}
                mediaType="movie"
              />
            )}
            <div className="mb-4">
              <div className="mb-2">
                <h2 className="font-semibold text-zinc-100">Reviews</h2>
              </div>
              {data.reviews.results.length === 0 && (
                <p className="text-sm italic text-zinc-400">No Reviews yet.</p>
              )}
              {data.reviews.results.length > 0 && (
                <>
                  <Review review={data.reviews.results[0]} />
                  <div className="mt-2 flex justify-end">
                    <Link
                      className="text-sm text-pink-500"
                      href={`${id}/reviews`}
                    >
                      Read More Reviews
                    </Link>
                  </div>
                </>
              )}
            </div>
            <Media className="mb-4" images={data.images} videos={data.videos} />
          </div>
          <div className="col-span-4">
            <div className="mb-4">
              <ExternalLinks
                externalIds={data.external_ids}
                homepage={data.homepage}
              />
            </div>
            <Facts className="mb-4" data={data} />
            <Keywords className="mb-4" keywords={data.keywords.keywords} />
          </div>
        </div>
        {data.recommendations.results.length > 0 && (
          <Recommendations recommendations={data.recommendations} />
        )}
      </Container>
    </>
  );
}
