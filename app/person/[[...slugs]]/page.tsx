import Image from "next/image";
import { configuration } from "@/src/utils/data";
import Container from "@/src/components/Container";
import { PersonDetails } from "@/src/types/people";
import { calculateAge, formatDate } from "@/src/utils/helpers";
import Rating from "@/src/components/Rating";
import Credits from "@/src/components/Credits";
import KnownFor from "@/src/components/KnownFor";
import Bio from "@/src/components/Bio";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=combined_credits`;

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

export default async function PersonPage({
  params,
}: {
  params: {
    slugs: string[];
  };
}) {
  const id = params.slugs[0];
  const data: PersonDetails = await getData(id);
  const castCredits = data.combined_credits.cast.slice(0).sort((a, b) => {
    const aDate = "release_date" in a ? a.release_date : a.first_air_date;
    const bDate = "release_date" in b ? b.release_date : b.first_air_date;

    return Date.parse(bDate) - Date.parse(aDate);
  });

  const knownFor = data.combined_credits.cast
    .slice(0)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 4);

  return (
    <Container>
      <div className="gap-2 grid grid-cols-profile mb-4">
        <div className="relative">
          <Image
            className="rounded"
            src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${data.profile_path}`}
            alt={data.name}
            width="1920"
            height="1080"
          />
          <div className="absolute right-1 bottom-1">
            <Rating rating={Math.round(data.popularity)} fixed={0} />
          </div>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-xl text-zinc-100">{data.name}</h1>
            <p className="text-xs text-zinc-400">
              <span className="font-extrabold">Born</span>
              <span className="font-semibold">&nbsp;&middot;&nbsp;</span>
              <span className="font-semibold">
                {formatDate(data.birthday)}
                {!data.deathday &&
                  ` (${calculateAge(data.birthday)} years old)`}
              </span>
            </p>
            {data.deathday && (
              <p className="text-xs text-zinc-400">
                <span className="font-extrabold">Died</span>
                <span className="font-semibold">&nbsp;&middot;&nbsp;</span>
                <span className="font-semibold">
                  {`${formatDate(data.deathday)} (${calculateAge(
                    data.birthday,
                    data.deathday
                  )} years old)`}
                </span>
              </p>
            )}
          </div>
          <Bio data={data} />
        </div>
      </div>
      <KnownFor knownFor={knownFor} />
      <Credits credits={castCredits} />
    </Container>
  );
}
