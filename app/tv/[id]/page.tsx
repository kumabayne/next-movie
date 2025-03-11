import Container from "@/components/container";
import { TVShowDetails } from "@/types/tv";
import MediaHero from "@/components/media-hero";
import GenreRow from "@/components/genre-row";
import ExternalLinks from "@/src/components/ExternalLinks";
import CastRow from "@/src/components/CastRow";
import Crew from "@/src/components/Crew";
import Recommendations from "@/src/components/Recommendations";
import Facts from "@/components/facts";
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

export default async function TVPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const data: TVShowDetails = await getData(id);
  const rating = data.content_ratings.results.find(
    (item) => item.iso_3166_1 === "US",
  )?.rating;
  const year = data.first_air_date.slice(0, 4);

  return (
    <>
      <div className="relative after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:to-transparent">
        <MediaHero data={data} />
      </div>
      <Container>
        <div className="mb-4">
          <h1 className="mb-2 text-xl font-semibold text-zinc-100">
            {data.name}
          </h1>
          <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            {rating && (
              <span className="inline-flex items-center justify-center rounded-sm bg-zinc-100 px-1 text-xs font-semibold text-zinc-800">
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
          <h2 className="text-xs font-medium text-zinc-400">Summary</h2>
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
