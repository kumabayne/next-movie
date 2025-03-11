import Logo from "@/components/logo";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Logo", () => {
  it("renders heading", () => {
    render(<Logo />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Film Snail" }),
    ).toBeDefined();
  });
});
