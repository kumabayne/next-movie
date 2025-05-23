import Image from "next/image";
import { configuration } from "@/utils/data";
import Container from "@/components/container";
import { PersonDetailsType } from "@/types/people";
import { calculateAge, formatDate } from "@/utils/helpers";
import Rating from "@/components/rating";
import Credits from "@/src/components/Credits";
import KnownFor from "@/components/known-for";
import Bio from "@/components/bio";

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

export default async function PersonPage(props: {
  params: Promise<{
    slugs: string[];
  }>;
}) {
  const params = await props.params;
  const id = params.slugs[0];
  const data: PersonDetailsType = await getData(id);
  const castCredits = data.combined_credits.cast.slice(0).sort((a, b) => {
    const aDate = "release_date" in a ? a.release_date : a.first_air_date;
    const bDate = "release_date" in b ? b.release_date : b.first_air_date;

    return Date.parse(bDate || "") - Date.parse(aDate || "");
  });

  const knownFor = data.combined_credits.cast
    .slice(0)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 4);

  return (
    <div className="pt-16 lg:pt-6">
      <Container>
        <div className="mb-4 grid grid-cols-profile gap-2 md:grid-cols-[120px_1fr]">
          <div className="relative">
            <Image
              className="rounded"
              src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${data.profile_path}`}
              alt={data.name}
              width="1920"
              height="1080"
            />
            <div className="absolute bottom-1 right-1">
              <Rating rating={Math.round(data.popularity)} fixed={0} />
            </div>
          </div>
          <div className="md:self-end">
            <div className="mb-2 md:mb-0">
              <h1 className="text-xl font-semibold text-zinc-100">
                {data.name}
              </h1>
              <p className="text-xs text-zinc-400 md:text-base">
                <span className="font-extrabold md:font-semibold">Born</span>
                <span className="font-semibold md:font-normal">
                  &nbsp;&middot;&nbsp;
                </span>
                <span className="font-semibold md:font-normal">
                  {formatDate(data.birthday)}
                  {!data.deathday &&
                    ` (${calculateAge(data.birthday)} years old)`}
                </span>
              </p>
              {data.deathday && (
                <p className="text-xs text-zinc-400 md:text-base">
                  <span className="font-extrabold md:font-semibold">Died</span>
                  <span className="font-semibold md:font-normal">
                    &nbsp;&middot;&nbsp;
                  </span>
                  <span className="font-semibold md:font-normal">
                    {`${formatDate(data.deathday)} (${calculateAge(
                      data.birthday,
                      data.deathday,
                    )} years old)`}
                  </span>
                </p>
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-xs text-zinc-400 md:text-base">
                <b>Known For:</b> {data.known_for_department}
              </p>
              <p className="text-xs text-zinc-400 md:text-base">
                <b>Place of Birth:</b> {data.place_of_birth}
              </p>
            </div>
            <div className="md:hidden">
              <Bio data={data} />
            </div>
          </div>
        </div>
        <div className="mb-4 hidden md:block">
          <h2 className="col-span-full font-semibold text-zinc-100">Bio</h2>
          <p className="text-zinc-400">{data.biography}</p>
        </div>
        <div className="max-w-md">
          <KnownFor knownFor={knownFor} />
        </div>
        <Credits credits={castCredits} />
      </Container>
    </div>
  );
}
