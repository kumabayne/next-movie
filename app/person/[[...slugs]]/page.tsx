import Image from "next/image";
import { configuration } from "@/utils/data";
import Container from "@/components/container";
import { PersonDetailsType } from "@/types/people";
import { calculateAge, formatDate } from "@/utils/helpers";
import Credits from "@/src/components/Credits";
import Bio from "@/components/bio";
import Typography from "@/components/typography";
import MediaRow from "@/components/media-row";
import { MovieType } from "@/types/movie";
import PersonSocial from "@/components/person-social";
import ImageGallery from "@/components/image-gallery";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=combined_credits,images,external_ids`;

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
    .slice(0, 5) as MovieType[];

  return (
    <main className="pt-16">
      <Container>
        <div className="xl:grid xl:grid-cols-2">
          <div className="mb-4 grid grid-cols-[120px_1fr] items-start gap-2 md:grid-cols-[160px_1fr] md:gap-6">
            <div className="xl xl:grid">
              <div className="relative">
                {data.images.profiles.length > 1 ? (
                  <ImageGallery
                    images={data.images}
                    trigger={{
                      src: `${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${data.profile_path}`,
                      alt: data.name,
                      width: 1920,
                      height: 1080,
                    }}
                  />
                ) : (
                  <Image
                    className="rounded-xl"
                    src={`${configuration.images.secure_base_url}${configuration.images.profile_sizes[3]}${data.profile_path}`}
                    alt={data.name}
                    width="1920"
                    height="1080"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2 md:self-end">
              <div className="mb-2 md:mb-0">
                <Typography
                  as="h1"
                  className="text-xl font-semibold text-zinc-100"
                >
                  {data.name}
                </Typography>
                <div className="flex flex-col flex-wrap gap-0.5 md:flex-row md:gap-6">
                  <div>
                    <p className="text-sm font-bold">Born</p>
                    <p className="text-sm">
                      {formatDate(data.birthday)}
                      {!data.deathday &&
                        ` (${calculateAge(data.birthday)} years old)`}
                    </p>
                  </div>
                  {data.deathday && (
                    <div>
                      <p className="text-sm font-bold">Died</p>
                      <p className="text-sm">
                        {`${formatDate(data.deathday)} (${calculateAge(
                          data.birthday,
                          data.deathday,
                        )} years old)`}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold">Known For</p>
                    <p className="text-sm">{data.known_for_department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Place of Birth</p>
                    <p className="text-sm">{data.place_of_birth}</p>
                  </div>
                </div>
              </div>
              <PersonSocial data={data.external_ids} />
            </div>
          </div>
          <div className="col-span-full">
            <Bio data={data} />
          </div>
        </div>
        <div className="space-y-2 xl:mt-6">
          <Typography as="h2">Known For</Typography>
          <MediaRow data={{ results: knownFor }} />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Credits credits={castCredits} />
          </div>
        </div>
      </Container>
    </main>
  );
}
