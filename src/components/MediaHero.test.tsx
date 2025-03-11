import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaHero from "../../components/media-hero";
import { movieDetail } from "../utils/test-data";

describe.skip("MediaHero", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders movie poster", () => {
    render(<MediaHero data={movieDetail} />);
    expect(screen.getByAltText(movieDetail.title)).toBeInTheDocument();
  });

  it("renders play trailer button", () => {
    render(<MediaHero data={movieDetail} />);
    expect(
      screen.getByRole("button", { name: /trailer/i })
    ).toBeInTheDocument();
  });
});
