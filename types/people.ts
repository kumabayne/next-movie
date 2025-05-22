import { MovieType } from "./movie";
import { TVShow } from "./tv";

type CastCrewType = {
  credit_id: string;
};

type PersonSharedType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export interface CastType extends CastCrewType, PersonSharedType {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewType extends CastCrewType, PersonSharedType {
  department: string;
  job: string;
  jobs?: {
    credit_id: string;
    episode_count: number;
    job: string;
  }[];
}

export interface PersonType extends PersonSharedType {
  known_for?: (MovieType | TVShow)[];
  media_type?: string;
}

export type PersonResultsType = {
  page: number;
  results: PersonType[];
  total_pages: number;
  total_results: number;
};

export type PersonDetailsType = {
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
    cast: (MovieType | TVShow)[];
  };
};
