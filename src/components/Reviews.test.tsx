import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Reviews from "./Reviews";
import { reviews } from "../utils/test-data";

describe("Reviews", () => {
  it.skip("renders heading", () => {
    // render(<Reviews reviews={reviews} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /reviews/i
    );
  });
  it.skip("renders button", () => {
    // render(<Reviews reviews={reviews} />);
    expect(
      screen.getByRole("button", { name: /see all/i })
    ).toBeInTheDocument();
  });
  it.skip("renders review", () => {
    // render(<Reviews reviews={reviews} />);
    expect(screen.getByTestId("user-review-0")).toBeInTheDocument();
  });
});
