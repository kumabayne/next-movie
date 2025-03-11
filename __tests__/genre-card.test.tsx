import GenreCard from "@/components/genre-card";
import { IconSwords } from "@tabler/icons-react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

const actionGenre = {
  id: 28,
  name: "Action",
  Icon: IconSwords,
};

describe("GenreCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders link", () => {
    render(<GenreCard item={actionGenre} media={false} />);
    const link = screen.getByRole("link", { name: "Action" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe(
      `/genre/${actionGenre.id}-${actionGenre.name}/movie/1`,
    );
  });

  it("renders icon", () => {
    render(<GenreCard item={actionGenre} media={false} />);
    expect(screen.getByTestId("genrecard-icon")).toBeDefined();
  });
});
