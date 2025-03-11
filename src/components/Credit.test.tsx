import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Credit from "../../components/credit";
import { movieCredit, tvshowCredit } from "../utils/test-data";

describe("Credit", () => {
  it("renders movie poster", () => {
    render(<Credit credit={movieCredit} />);
    expect(screen.getByAltText(movieCredit.title)).toBeInTheDocument();
  });

  it("renders tv show poster", () => {
    render(<Credit credit={tvshowCredit} />);
    expect(screen.getByAltText(tvshowCredit.name)).toBeInTheDocument();
  });

  it("renders release date year", () => {
    const year = movieCredit.release_date.substring(0, 4);
    render(<Credit credit={movieCredit} />);
    expect(screen.getByText(year)).toBeInTheDocument();
  });

  it("renders air date year", () => {
    const year = tvshowCredit.first_air_date.substring(0, 4);
    render(<Credit credit={tvshowCredit} />);
    expect(screen.getByText(year)).toBeInTheDocument();
  });

  it("renders movie title", () => {
    render(<Credit credit={movieCredit} />);
    expect(screen.getByText(movieCredit.title)).toBeInTheDocument();
  });

  it("renders tv show name", () => {
    render(<Credit credit={tvshowCredit} />);
    expect(screen.getByText(tvshowCredit.name)).toBeInTheDocument();
  });

  it("renders character name", () => {
    const character = movieCredit.character || "";
    render(<Credit credit={movieCredit} />);
    expect(screen.getByText(character)).toBeInTheDocument();
  });

  it("renders episode count", () => {
    const episodes = tvshowCredit.episode_count;
    render(<Credit credit={tvshowCredit} />);
    expect(screen.getByText(`(${episodes} episodes)`)).toBeInTheDocument();
  });
});
