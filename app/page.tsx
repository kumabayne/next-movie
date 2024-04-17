import { register } from "swiper/element/bundle";
import Hero from "@/src/components/Hero";
import MediaRow from "@/src/components/MediaRow";
import GenreRow from "@/src/components/GenreRow";
import { movieGenres } from "@/src/utils/data";
import Container from "@/src/components/Container";

export default async function Home() {
  register();

  return (
    <>
      <Hero category="now_playing" title="Now Playing" />
      <Container className="mb-6">
        <GenreRow genres={movieGenres.genres} title="Genres" />
      </Container>
      <MediaRow query="trending/movie/day" heading="Trending Movies" />
      <MediaRow query="trending/tv/day" heading="Trending TV Shows" />
      <MediaRow query="trending/person/day" heading="Trending People" />
    </>
  );
}
