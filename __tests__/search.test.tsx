import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Search from "@/components/search";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  }),
}));

describe("Search", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a search input", async () => {
    render(<Search />);
    const searchBtn = screen.getByRole("button", {
      name: "Search for movies, tv shows, people and more...",
    });
    await fireEvent.click(searchBtn);
    expect(screen.getByRole("textbox", { name: "query" })).toBeDefined();
  });

  it("renders a search button", async () => {
    render(<Search />);
    const searchBtn = screen.getByRole("button", {
      name: "Search for movies, tv shows, people and more...",
    });
    await fireEvent.click(searchBtn);
    expect(screen.getByRole("button", { name: "Search" })).toBeDefined();
  });

  it("updates value when user types in input", async () => {
    render(<Search />);
    const searchBtn = screen.getByRole("button", {
      name: "Search for movies, tv shows, people and more...",
    });
    await fireEvent.click(searchBtn);
    const input: HTMLInputElement = screen.getByRole("textbox", {
      name: "query",
    });
    await fireEvent.change(input, { target: { value: "new value" } });
    expect(input.value).toBe("new value");
  });
});
