import { Movie } from "./movie";
import { TVShow } from "./tv";

export type Keyword = {
  id: number;
  name: string;
};

export type ExternalIds = {
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
};

export interface ExternalIdsTVShow extends ExternalIds {
  id: 66573;
  freebase_id: string | null;
  freebase_mid: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
}

export type Recommendations = {
  page: number;
  results: Movie[] | TVShow[];
  total_pages: number;
  total_results: number;
};
