import Container from "@/src/components/Container";
import { TVShowDetails } from "@/src/types/tv";
import MediaHero from "@/src/components/MediaHero";
import GenreRow from "@/src/components/GenreRow";
import ExternalLinks from "@/src/components/ExternalLinks";
import CastRow from "@/src/components/CastRow";
import Crew from "@/src/components/Crew";
import Recommendations from "@/src/components/Recommendations";
import Facts from "@/src/components/Facts";
import Keywords from "@/src/components/Keywords";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=videos,content_ratings,external_ids,aggregate_credits,recommendations,keywords`;

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

export default async function TVPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const data: TVShowDetails = await getData(id);
  const rating = data.content_ratings.results.find(
    (item) => item.iso_3166_1 === "US"
  )?.rating;
  const year = data.first_air_date.slice(0, 4);

  return (
    <>
      <div className="relative after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent">
        <MediaHero data={data} />
      </div>
      <Container>
        <div className="mb-4">
          <h1 className="font-semibold mb-2 text-xl text-zinc-100">
            {data.name}
          </h1>
          <div className="flex gap-2 items-center mb-2 text-sm text-zinc-400">
            {rating && (
              <span className="bg-zinc-100 font-semibold inline-flex items-center justify-center px-1 rounded-sm text-zinc-800 text-xs">
                {rating}
              </span>
            )}
            <span className="font-semibold">&middot;</span>
            <span>{year}</span>
            <span className="font-semibold">&middot;</span>
            <span>{data.number_of_episodes} episodes</span>
          </div>
          <div className="mb-2">
            <GenreRow media={false} genres={data.genres} />
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
        <CastRow cast={data.aggregate_credits.cast} className="mb-4" />
        {data.aggregate_credits.crew.length > 0 && (
          <Crew
            className="mb-4"
            createdBy={data.created_by}
            crew={data.aggregate_credits.crew}
            mediaType={"tvshow"}
          />
        )}
        <Facts className="mb-4" data={data} />
        <Keywords className="mb-4" keywords={data.keywords.results} />
        {data.recommendations && (
          <Recommendations recommendations={data.recommendations} />
        )}
      </Container>
    </>
  );
}
