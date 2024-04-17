import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import KeywordCard from "./KeywordCard";
import { keywords } from "../utils/test-data";

describe("KeywordCard", () => {
  it("renders keyword card", () => {
    const superhero = keywords.keywords[0];
    const invasion = keywords.keywords[2];
    render(<KeywordCard keyword={superhero} />);
    expect(screen.getByText(/superhero/i)).toBeInTheDocument();
    render(<KeywordCard keyword={invasion} />);
    expect(screen.getByText(/alien invasion/i)).toBeInTheDocument();
  });
});
