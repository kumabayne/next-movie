import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Rating from "./Rating";

describe("Rating", () => {
  it("renders rating with one fixed decimal", () => {
    const rating = 8.473;
    render(<Rating rating={rating} />);
    expect(screen.getByText(/8.5/i)).toBeInTheDocument();
  });
});
