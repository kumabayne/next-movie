import { Images, Videos } from "./media";
import { Cast, Crew } from "./people";
import { Reviews } from "./reviews";
import { ExternalIds, Keyword, Recommendations } from "./shared";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  character?: string;
  credit_id?: string;
  genre_ids: number[];
  id: number;
  media_type?: string;
  order?: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  external_ids: ExternalIds;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  images: Images;
  imdb_id: string;
  keywords: {
    keywords: Keyword[];
  };
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  recommendations: Recommendations;
  release_date: string;
  release_dates: ReleaseDates;
  revenue: number;
  reviews: Reviews;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: Videos;
  vote_average: number;
  vote_count: number;
};

type ReleaseDates = {
  id?: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: string[] | [];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
};
