import GenreRow from "@/components/genre-row";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmblaMocks } from "./mocks";

EmblaMocks();

describe("GenreRow", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders row title", () => {
    render(<GenreRow media={false} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Genres" }),
    ).toBeDefined();
  });
});
