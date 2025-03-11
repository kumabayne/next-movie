import HeroCard from "@/components/hero-card";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { movies } from "./data/movies";

describe("HeroCard", () => {
  afterEach(() => {
    cleanup();
  });

  const movie = movies.results[0];

  it("renders link", () => {
    render(<HeroCard item={movie} />);
    const link = screen.getByRole("link");
    const href = `/movie/${movie.id}`;
    expect(link.getAttribute("href")).toBe(href);
  });

  it("renders backdrop image", () => {
    render(<HeroCard item={movie} />);
    expect(screen.getByTestId("herocard-backdrop")).toBeDefined();
  });

  it("renders poster image", () => {
    render(<HeroCard item={movie} />);
    const title = movie.title;
    expect(screen.getByAltText(title)).toBeDefined();
  });

  it("renders rating", () => {
    render(<HeroCard item={movie} />);
    const rating = movie.vote_average.toFixed(1);
    expect(screen.getByText(rating)).toBeDefined();
  });

  it("renders title", () => {
    render(<HeroCard item={movie} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
  });

  it("renders watchlist button", () => {
    render(<HeroCard item={movie} />);
    expect(screen.getByRole("button", { name: "Watch Later" })).toBeDefined();
  });

  it("renders favorite button", () => {
    render(<HeroCard item={movie} />);
    expect(screen.getByRole("button", { name: "Favorite" })).toBeDefined();
  });
});
