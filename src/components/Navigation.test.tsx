import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("Navigation", () => {
  it("renders a hamburger button", () => {
    render(<Navigation />);
    expect(
      screen.getByRole("button", { name: /open main menu/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("hamburger")).toBeInTheDocument();
  });

  it("renders a close button when menu is open", () => {
    render(<Navigation />);
    const button = screen.getByRole("button", { name: /open main menu/i });
    fireEvent.click(button);
    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("renders navigation when menu is open", () => {
    render(<Navigation />);
    const button = screen.getByRole("button", { name: /open main menu/i });
    fireEvent.click(button);
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();
  });
});
