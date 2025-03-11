import Hero from "@/components/hero";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { movies } from "./data/movies";
import { EmblaMocks } from "./mocks";

EmblaMocks();

describe("Hero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders category badge", () => {
    render(<Hero data={movies} category={"Now Playing"} />);
    expect(screen.getByTestId("hero-badge")).toBeDefined();
  });
});
