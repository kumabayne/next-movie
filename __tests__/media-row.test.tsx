import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmblaMocks } from "./mocks";
import MediaRow from "@/components/media-row";
import { movies } from "./data/movies";

EmblaMocks();

describe("MediaRow", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders row title", () => {
    render(<MediaRow data={movies} heading="Trending Movies" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Trending Movies" }),
    ).toBeDefined();
  });
});
