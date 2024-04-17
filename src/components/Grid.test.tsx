import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "./Grid";

describe("Grid", () => {
  it("renders a div with grid layout", () => {
    render(<Grid />);
    expect(screen.getByTestId("grid")).toHaveClass("gap-6 grid grid-cols-12");
  });
});
