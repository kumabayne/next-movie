import Header from "@/components/header";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders header", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeDefined();
  });

  it("renders hamburger menu", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "Open Menu" })).toBeDefined();
  });

  it("renders logo", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Film Snail" }),
    ).toBeDefined();
  });

  it("renders a sign in button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "Sign In" })).toBeDefined();
  });
});
