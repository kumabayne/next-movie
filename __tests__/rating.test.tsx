import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { movies } from "./data/movies";
import Rating from "@/components/rating";

const movie = movies.results[0];

describe("Rating", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders rating", () => {
    const rating = movie.vote_average;
    render(<Rating rating={rating} />);
    expect(screen.getByText(rating)).toBeDefined();
  });
});
