import { cleanup, render, screen } from "@testing-library/react";
import { configuration } from "../utils/data";
import { afterEach, describe, expect, it } from "vitest";
import MediaCard from "@/components/media-card";
import { nowPlayingMovies } from "./data/movies";
import { trendingPeople } from "./data/people";

const movie = nowPlayingMovies.results[0];
const person = trendingPeople.results[0];
const personWithoutProfilePicture = trendingPeople.results[7];

describe("MediaCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders link", () => {
    render(<MediaCard item={movie} />);
    const link = screen.getByRole("link", { name: movie.title });
    expect(link.getAttribute("href")).toBe(`/${movie.media_type}/${movie.id}`);
  });

  it("renders image", () => {
    render(<MediaCard item={movie} />);
    expect(screen.getByAltText(movie.title)).toBeDefined();
  });

  it("renders movie poster", () => {
    render(<MediaCard item={movie} />);
    const poster = screen.getByAltText(movie.title);
    expect(poster.getAttribute("src")).toBe(
      `/_next/image?url=${encodeURIComponent(
        configuration.images.secure_base_url,
      )}${encodeURIComponent(
        configuration.images.poster_sizes[4],
      )}${encodeURIComponent(movie.poster_path)}&w=384&q=75`,
    );
  });

  it("renders profile picture", () => {
    render(<MediaCard item={person} />);
    const profilePicture = screen.getByAltText(person.name);
    expect(profilePicture.getAttribute("src")).toBe(
      `/_next/image?url=${encodeURIComponent(
        configuration.images.secure_base_url,
      )}${encodeURIComponent(
        configuration.images.profile_sizes[2],
      )}${encodeURIComponent(person.profile_path as string)}&w=384&q=75`,
    );
  });

  it("renders persons name and icon if profile picture is null", () => {
    render(<MediaCard item={personWithoutProfilePicture} />);
    expect(screen.getByTestId("mediacard-icon")).toBeDefined();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: personWithoutProfilePicture.name,
      }),
    ).toBeDefined();
  });
});
