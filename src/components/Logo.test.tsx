import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "./Logo";

test("Logo", () => {
  render(<Logo />);
  expect(screen.getByRole("heading")).toHaveTextContent("Movie App");
});
