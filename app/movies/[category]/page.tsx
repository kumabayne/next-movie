import Container from "@/components/container";
import MediaFeed from "@/components/media-feed";
import Typography from "@/components/typography";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ category: string }>;
};

const metaData: Record<string, { title: string; description: string }> = {
  now_playing: {
    title: "In Theaters",
    description: "Check out the latest movies in theaters now.",
  },
  popular: {
    title: "Popular",
    description: "Find out what everyone is talking about. Or...don't.",
  },
  top_rated: { title: "Top Rated", description: "Who gave this 5 stars?" },
  upcoming: {
    title: "Coming Soon",
    description: "Find the next Marvel movie to watch.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = (await params).category.replaceAll("-", "_");
  const title = metaData[category].title;
  const description = metaData[category].description;

  return {
    title: `${title} Movies - Film Snail`,
    description: description,
  };
}

export default async function MoviesCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category.replaceAll("-", "_");
  const data = await fetch(
    `${process.env.TMDB_URL}/movie/${category}?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    },
  );
  const movies = await data.json();
  const title = metaData[category].title;

  return (
    <main className="mt-12 min-h-screen py-6 md:mt-20 lg:mt-28 xl:mt-32">
      <div className="fixed top-0 -z-10 max-h-[400px] overflow-hidden opacity-60 backdrop-grayscale after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:to-transparent">
        <Image
          className="max-h-[400px] object-cover grayscale"
          src={`/${category}.webp`}
          width="4032"
          height="2268"
          alt={category.replaceAll("_", " ")}
        />
      </div>
      <Container>
        <div className="space-y-4">
          <Typography as="h1">{title}</Typography>
          <div>
            <MediaFeed category={category} initialItems={movies} type="movie" />
          </div>
        </div>
      </Container>
    </main>
  );
}
