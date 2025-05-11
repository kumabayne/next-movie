import Container from "@/components/container";
import { MovieDetails } from "@/types/movie";
import CastRow from "@/src/components/cast-row";
import Crew from "@/src/components/crew";
import MediaHero from "@/components/media-hero";
import Review from "@/components/review";
import Link from "next/link";
import Media from "@/components/media";
import ExternalLinks from "@/src/components/ExternalLinks";
import Facts from "@/components/facts";
import Keywords from "@/src/components/Keywords";
import Recommendations from "@/src/components/Recommendations";
import Watchlist from "@/components/watchlist";
import Favorite from "@/components/favorite";
import Typography from "@/components/typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlayerPlay, IconX } from "@tabler/icons-react";

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
  const trailers = data.videos.results.filter(
    (video) => video.type === "Trailer",
  );

  return (
    <>
      <div className="relative after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:via-transparent after:to-black/70 lg:max-h-[600px] xl:after:to-transparent">
        <MediaHero data={data} />
      </div>
      <Container>
        <div className="space-y-4 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="col-span-8 space-y-4">
            <div className="mt-6 flex items-center justify-between gap-2">
              {trailers.length > 0 && (
                <Dialog>
                  <DialogTrigger className="flex gap-1 rounded-full border border-white px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:text-white/90 focus:text-white/90">
                    <IconPlayerPlay className="h-4 w-4" />
                    <span>Watch Trailer</span>
                  </DialogTrigger>

                  <DialogContent
                    className="flex h-[100svh] w-[100svw] max-w-none items-center justify-center border-none bg-transparent p-0"
                    hideCloseBtn={true}
                  >
                    <DialogClose className="absolute right-2 top-2 z-[100] p-2">
                      <IconX className="h-6 w-6" />
                    </DialogClose>
                    <div className="mx-auto w-4/5">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{data.title} - Trailer</DialogTitle>
                        <DialogDescription>{data.overview}</DialogDescription>
                      </DialogHeader>
                      <iframe
                        className="aspect-video w-full"
                        src={`https://www.youtube.com/embed/${trailers[0].key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <div className="flex gap-2 md:hidden">
                <Watchlist />
                <Favorite />
              </div>
            </div>
            <div className="space-y-2">
              <Typography as="h2">Summary</Typography>
              <p className="text-white">{data.overview}</p>
            </div>
            <CastRow cast={data.credits.cast} />
            {data.credits.crew.length > 0 && (
              <Crew crew={data.credits.crew} mediaType="movie" />
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Typography as="h2">Reviews</Typography>
                {data.reviews.results.length > 0 && (
                  <Link
                    className="text-sm font-medium text-primary"
                    href={`${id}/reviews`}
                  >
                    More
                  </Link>
                )}
              </div>
              {data.reviews.results.length === 0 && (
                <p className="text-sm italic text-neutral-500">
                  No Reviews yet.
                </p>
              )}
              {data.reviews.results.length > 0 && (
                <>
                  <Review review={data.reviews.results[0]} />
                </>
              )}
            </div>
            <Media images={data.images} />
          </div>
          <div className="col-span-4 space-y-4">
            <div>
              <ExternalLinks
                externalIds={data.external_ids}
                homepage={data.homepage}
              />
            </div>
            <Facts data={data} />
            <Keywords keywords={data.keywords.keywords} />
          </div>
        </div>
        {data.recommendations.results.length > 0 && (
          <Recommendations recommendations={data.recommendations} />
        )}
      </Container>
    </>
  );
}
