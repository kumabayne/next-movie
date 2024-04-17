import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KnownFor from "./KnownFor";
import { movieCredit, tvshowCredit } from "../utils/test-data";

describe("KnownFor", () => {
  it("renders movie poster", () => {
    render(<KnownFor knownFor={[movieCredit]} />);
    expect(screen.getByAltText(movieCredit.title)).toBeInTheDocument();
  });

  it("renders tv poster", () => {
    render(<KnownFor knownFor={[tvshowCredit]} />);
    expect(screen.getByAltText(tvshowCredit.name)).toBeInTheDocument();
  });

  it("renders movie title", () => {
    render(<KnownFor knownFor={[movieCredit]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      movieCredit.title
    );
  });

  it("renders tv show name", () => {
    render(<KnownFor knownFor={[tvshowCredit]} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      tvshowCredit.name
    );
  });
});
