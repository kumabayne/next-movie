import { Movie } from "./movie";
import { TVShow } from "./tv";

type CastCrew = {
  credit_id: string;
};

type PersonShared = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export interface Cast extends CastCrew, PersonShared {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends CastCrew, PersonShared {
  department: string;
  job: string;
  jobs?: {
    credit_id: string;
    episode_count: number;
    job: string;
  }[];
}

export interface Person extends PersonShared {
  known_for: (Movie | TVShow)[];
  media_type?: string;
}

export type PersonDetails = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  combined_credits: {
    cast: (Movie | TVShow)[];
  };
};
