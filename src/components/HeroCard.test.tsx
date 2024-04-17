import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroCard from "./HeroCard";

describe("HeroCard", () => {
  const item = {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [28, 12, 878],
    id: 693134,
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 1525.769,
    poster_path: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    release_date: "2024-02-27",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.458,
    vote_count: 852,
  };
  it("renders a link to movie page", () => {
    render(<HeroCard item={item} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/693134");
  });

  it("renders an image with alt text", () => {
    render(<HeroCard item={item} />);
    expect(screen.getByAltText(/dune: part two/i)).toBeInTheDocument();
  });

  it("renders a title", () => {
    render(<HeroCard item={item} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Dune: Part Two");
  });
});
