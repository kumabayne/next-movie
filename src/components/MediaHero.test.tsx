import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaHero from "./MediaHero";
import { movieDetail } from "../utils/test-data";

describe("MediaHero", () => {
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
