import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./Search";

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

describe("Search", () => {
  it("renders a search input", () => {
    const push = jest.fn();
    render(<Search />);
    expect(
      screen.getByRole("textbox", { name: /search/i })
    ).toBeInTheDocument();
  });

  it("renders a search button", () => {
    const push = jest.fn();
    render(<Search />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("updates value when user types in input", () => {
    const push = jest.fn();
    render(<Search />);
    const input = screen.getByRole("textbox", { name: /search/i });
    fireEvent.change(input, { target: { value: "new value" } });
    expect(input).toHaveValue("new value");
  });
});
