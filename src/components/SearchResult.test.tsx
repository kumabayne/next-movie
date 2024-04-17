import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResult from "./SearchResult";
import { formatDate } from "../utils/helpers";
import { movie, personMovie, personTV, tvshow } from "../utils/test-data";

describe("SearchResult", () => {
  it("renders a poster of the movie or tv show", () => {
    render(<SearchResult item={movie} />);
    expect(screen.getByAltText(movie.title)).toBeInTheDocument();
  });

  it("renders a profile picture of person", () => {
    render(<SearchResult item={personMovie} />);
    expect(screen.getByAltText(personMovie.name)).toBeInTheDocument();
  });

  it("renders silhouette icon if profile_path doesn't exist", () => {
    personMovie.profile_path = null;
    render(<SearchResult item={personMovie} />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  it("renders title or person's name", () => {
    render(<SearchResult item={movie} />);
    expect(
      screen.getByRole("heading", { name: /Captain America: Civil War/i })
    ).toBeInTheDocument();
  });

  it("renders release date if movie", () => {
    render(<SearchResult item={movie} />);
    expect(
      screen.getByText(formatDate(movie.release_date))
    ).toBeInTheDocument();
  });

  it("renders first air date if tvshow", () => {
    render(<SearchResult item={tvshow} />);
    expect(
      screen.getByText(formatDate(tvshow.first_air_date))
    ).toBeInTheDocument();
  });

  it("renders overview of movie or tv show", () => {
    render(<SearchResult item={movie} />);
    expect(screen.getByTestId("overview-known_for")).toBeInTheDocument();
  });

  it("renders known for movie titles for person", () => {
    const knownFor = personMovie.known_for.reduce(
      (prev, current) =>
        prev.length > 0
          ? `${prev} · ${"title" in current ? current.title : current.name}`
          : "title" in current
          ? current.title
          : current.name,
      ""
    );

    render(<SearchResult item={personMovie} />);
    expect(screen.getByText(knownFor)).toBeInTheDocument();
  });

  it("renders known for tv show names for person", () => {
    const knownFor = personTV.known_for.reduce(
      (prev, current) =>
        prev.length > 0
          ? `${prev} · ${"title" in current ? current.title : current.name}`
          : "title" in current
          ? current.title
          : current.name,
      ""
    );

    render(<SearchResult item={personTV} />);
    expect(screen.getByText(knownFor)).toBeInTheDocument();
  });
});
