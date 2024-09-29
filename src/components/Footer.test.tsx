import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Search", () => {
  it("renders a footer", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeDefined();
  });

  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByTestId("copyright")).toBeDefined();
  });

  it("renders tmdb logo", () => {
    render(<Footer />);
    expect(screen.getAllByAltText(/The Movie Database/i)).toBeDefined();
  });

  it("renders tmdb attribution", () => {
    render(<Footer />);
    expect(screen.getByTestId("tmdb-attribution")).toBeDefined();
  });
});
