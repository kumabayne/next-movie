import {
  TbAlien,
  TbBook2,
  TbBuildingCastle,
  TbCamera,
  TbCompass,
  TbDeviceTvOld,
  TbGavel,
  TbGhost2,
  TbHeart,
  TbHorse,
  TbMasksTheater,
  TbMusic,
  TbPencil,
  TbSearch,
  TbSlice,
  TbSwords,
  TbTank,
  TbUsersGroup,
} from "react-icons/tb";

export const configuration = {
  images: {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
  },
  change_keys: [
    "adult",
    "air_date",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "certifications",
    "character_names",
    "created_by",
    "crew",
    "deathday",
    "episode",
    "episode_number",
    "episode_run_time",
    "freebase_id",
    "freebase_mid",
    "general",
    "genres",
    "guest_stars",
    "homepage",
    "images",
    "imdb_id",
    "languages",
    "name",
    "network",
    "origin_country",
    "original_name",
    "original_title",
    "overview",
    "parts",
    "place_of_birth",
    "plot_keywords",
    "production_code",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "season",
    "season_number",
    "season_regular",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "translations",
    "tvdb_id",
    "tvrage_id",
    "type",
    "video",
    "videos",
  ],
};

export const movieGenres = {
  genres: [
    {
      id: 28,
      name: "Action",
      Icon: TbSwords,
    },
    {
      id: 12,
      name: "Adventure",
      Icon: TbCompass,
    },
    {
      id: 16,
      name: "Animation",
      Icon: TbPencil,
    },
    {
      id: 35,
      name: "Comedy",
      Icon: TbMasksTheater,
    },
    {
      id: 80,
      name: "Crime",
      Icon: TbGavel,
    },
    {
      id: 99,
      name: "Documentary",
      Icon: TbCamera,
    },
    {
      id: 18,
      name: "Drama",
      Icon: TbMasksTheater,
    },
    {
      id: 10751,
      name: "Family",
      Icon: TbUsersGroup,
    },
    {
      id: 14,
      name: "Fantasy",
      Icon: TbBuildingCastle,
    },
    {
      id: 36,
      name: "History",
      Icon: TbBook2,
    },
    {
      id: 27,
      name: "Horror",
      Icon: TbGhost2,
    },
    {
      id: 10402,
      name: "Music",
      Icon: TbMusic,
    },
    {
      id: 9648,
      name: "Mystery",
      Icon: TbSearch,
    },
    {
      id: 10749,
      name: "Romance",
      Icon: TbHeart,
    },
    {
      id: 878,
      name: "Science Fiction",
      Icon: TbAlien,
    },
    {
      id: 10770,
      name: "TV Movie",
      Icon: TbDeviceTvOld,
    },
    {
      id: 53,
      name: "Thriller",
      Icon: TbSlice,
    },
    {
      id: 10752,
      name: "War",
      Icon: TbTank,
    },
    {
      id: 37,
      name: "Western",
      Icon: TbHorse,
    },
  ],
};
