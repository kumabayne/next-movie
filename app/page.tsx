import MediaRow from "@/components/media-row";
import GenreRow from "@/components/genre-row";
import Hero from "@/components/hero";
import Container from "@/components/container";

async function getHero(category: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    },
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getRow(query: string) {
  const res = await fetch(`https://api.themoviedb.org/3/${query}`, {
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

export default async function Home() {
  const heroData = getHero("now_playing");
  const movieRow = getRow("trending/movie/day");
  const tvShowRow = getRow("trending/tv/day");
  const peopleRow = getRow("trending/person/day");

  // Initiate both requests in parallel
  const [hero, movies, tvShows, people] = await Promise.all([
    heroData,
    movieRow,
    tvShowRow,
    peopleRow,
  ]);

  return (
    <>
      <Hero data={hero} />
      {/* <GenreRow media={false} /> */}
      <div className="space-y-4">
        <Container>
          <MediaRow data={movies} heading="Trending Movies" />
        </Container>
        <Container>
          <MediaRow data={tvShows} heading="Trending TV Shows" />
        </Container>
        <Container>
          <MediaRow data={people} heading="Trending People" />
        </Container>
      </div>
    </>
  );
}
