import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaCard from "./MediaCard";
import { configuration } from "../utils/data";

describe("MediaCard", () => {
  const movie = {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    id: 693134,
    title: "Dune: Part Two",
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    media_type: "movie",
    genre_ids: [28, 12, 878],
    popularity: 1702.039,
    release_date: "2024-02-27",
    video: false,
    vote_average: 8.473,
    vote_count: 770,
  };

  const person = {
    adult: false,
    id: 54693,
    name: "Emma Stone",
    original_name: "Emma Stone",
    media_type: "person",
    popularity: 148.028,
    gender: 1,
    known_for_department: "Acting",
    profile_path: "",
    known_for: [
      {
        adult: false,
        backdrop_path: "/kmuSGNlF9mfNHIDOEVEWPj6f3Ak.jpg",
        id: 337404,
        title: "Cruella",
        original_language: "en",
        original_title: "Cruella",
        overview:
          "In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.",
        poster_path: "/wToO8opxkGwKgSfJ1JK8tGvkG6U.jpg",
        media_type: "movie",
        genre_ids: [35, 80],
        popularity: 71.077,
        release_date: "2021-05-26",
        video: false,
        vote_average: 8.028,
        vote_count: 8862,
      },
      {
        adult: false,
        backdrop_path: "/sxskOU71CO8LaNX2LOtjYFUtKv7.jpg",
        id: 1930,
        title: "The Amazing Spider-Man",
        original_language: "en",
        original_title: "The Amazing Spider-Man",
        overview:
          "Peter Parker is an outcast high schooler abandoned by his parents as a boy, leaving him to be raised by his Uncle Ben and Aunt May. Like most teenagers, Peter is trying to figure out who he is and how he got to be the person he is today. As Peter discovers a mysterious briefcase that belonged to his father, he begins a quest to understand his parents' disappearance – leading him directly to Oscorp and the lab of Dr. Curt Connors, his father's former partner. As Spider-Man is set on a collision course with Connors' alter ego, The Lizard, Peter will make life-altering choices to use his powers and shape his destiny to become a hero.",
        poster_path: "/jIfkQNARYyERqRAq1p1c8xgePp4.jpg",
        media_type: "movie",
        genre_ids: [28, 12, 878],
        popularity: 70.059,
        release_date: "2012-06-23",
        video: false,
        vote_average: 6.697,
        vote_count: 16733,
      },
      {
        adult: false,
        backdrop_path: "/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg",
        id: 313369,
        title: "La La Land",
        original_language: "en",
        original_title: "La La Land",
        overview:
          "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
        poster_path: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        media_type: "movie",
        genre_ids: [35, 18, 10749, 10402],
        popularity: 56.699,
        release_date: "2016-11-29",
        video: false,
        vote_average: 7.901,
        vote_count: 16070,
      },
    ],
  };

  it("renders a link to media page", () => {
    render(<MediaCard item={movie} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/693134");
  });

  it("renders an image with alt text", () => {
    render(<MediaCard item={movie} />);
    expect(screen.getByAltText(/dune: part two/i)).toBeInTheDocument();
  });

  it("renders poster if type is movie", () => {
    render(<MediaCard item={movie} />);
    expect(screen.getByAltText(/dune: part two/i)).toHaveAttribute(
      "src",
      `/_next/image?url=${encodeURIComponent(
        configuration.images.secure_base_url
      )}${encodeURIComponent(
        configuration.images.poster_sizes[1]
      )}${encodeURIComponent(movie.poster_path)}&w=256&q=75`
    );
  });

  // it("renders image with empty src if profile_path is falsy", () => {
  //   render(<MediaCard item={person} />);
  //   expect(screen.getByAltText(/emma stone/i).getAttribute("src")).toBe("");
  // });

  it("renders profile pic if type is person", () => {
    person.profile_path = "/cZ8a3QvAnj2cgcgVL6g4XaqPzpL.jpg";
    render(<MediaCard item={person} />);
    expect(screen.getByAltText(/emma stone/i)).toHaveAttribute(
      "src",
      `/_next/image?url=${encodeURIComponent(
        configuration.images.secure_base_url
      )}${encodeURIComponent(
        configuration.images.profile_sizes[1]
      )}${encodeURIComponent(person.profile_path)}&w=256&q=75`
    );
  });

  it("renders a title", () => {
    render(<MediaCard item={movie} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Dune: Part Two");
  });
});
