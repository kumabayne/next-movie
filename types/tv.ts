import { Videos } from "./media";
import { Cast, Crew } from "./people";
import { ExternalIdsTVShow, Keyword, Recommendations } from "./shared";

export type TVShow = {
  adult: boolean;
  backdrop_path: string;
  character?: string;
  content_ratings?: {
    results: {
      descriptors: string[] | [];
      iso_3166_1: string;
      rating: string;
    }[];
  };
  credit_id?: string;
  episode_count?: number;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  recommendations?: Recommendations;
  vote_average: number;
  vote_count: number;
};

export type TVShowDetails = {
  adult: boolean;
  aggregate_credits: {
    cast: Cast[];
    crew: Crew[];
  };
  backdrop_path: string;
  content_ratings: {
    results: {
      descriptors: string[] | [];
      iso_3166_1: string;
      rating: string;
    }[];
  };
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
  }[];
  episode_run_time: number[];
  external_ids: ExternalIdsTVShow;
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  keywords: {
    results: Keyword[];
  };
  languages: string[];
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  } | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
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
  recommendations?: Recommendations;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  videos: Videos;
  vote_average: number;
  vote_count: number;
};
