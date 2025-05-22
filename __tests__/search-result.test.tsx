import { cleanup, render, screen } from "@testing-library/react";
import { formatDate } from "../utils/helpers";
import { movie, personMovie, personTV, tvshow } from "../utils/test-data";
import { afterEach, describe, expect, it } from "vitest";
import SearchResult from "@/components/search-result";

describe("SearchResult", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a poster of the movie or tv show", () => {
    render(<SearchResult item={movie} />);
    expect(screen.getByAltText(movie.title)).toBeDefined();
  });

  it("renders a profile picture of person", () => {
    render(<SearchResult item={personMovie} />);
    expect(screen.getByAltText(personMovie.name)).toBeDefined();
  });

  it("renders silhouette icon if profile_path doesn't exist", () => {
    personMovie.profile_path = null;
    render(<SearchResult item={personMovie} />);
    expect(screen.getByTestId("avatar")).toBeDefined();
  });

  it("renders title or person's name", () => {
    render(<SearchResult item={movie} />);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Captain America: Civil War",
      }),
    ).toBeDefined();
  });

  it.skip("renders release date if movie", () => {
    render(<SearchResult item={movie} />);
    expect(
      screen.getByText(formatDate(movie.release_date)),
    ).toBeInTheDocument();
  });

  it.skip("renders first air date if tvshow", () => {
    render(<SearchResult item={tvshow} />);
    expect(
      screen.getByText(formatDate(tvshow.first_air_date)),
    ).toBeInTheDocument();
  });

  it.skip("renders overview of movie or tv show", () => {
    render(<SearchResult item={movie} />);
    expect(screen.getByTestId("overview-known_for")).toBeInTheDocument();
  });

  it.skip("renders known for movie titles for person", () => {
    const knownFor = personMovie.known_for.reduce(
      (prev, current) =>
        prev.length > 0
          ? `${prev} · ${"title" in current ? current.title : current.name}`
          : "title" in current
            ? current.title
            : current.name,
      "",
    );

    render(<SearchResult item={personMovie} />);
    expect(screen.getByText(knownFor)).toBeInTheDocument();
  });

  it.skip("renders known for tv show names for person", () => {
    const knownFor = personTV.known_for.reduce(
      (prev, current) =>
        prev.length > 0
          ? `${prev} · ${"title" in current ? current.title : current.name}`
          : "title" in current
            ? current.title
            : current.name,
      "",
    );

    render(<SearchResult item={personTV} />);
    expect(screen.getByText(knownFor)).toBeInTheDocument();
  });
});
