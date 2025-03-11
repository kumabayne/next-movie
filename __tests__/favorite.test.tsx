import Favorite from "@/components/favorite";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Favorite", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders `Favorite` button", () => {
    render(<Favorite />);
    expect(screen.getByRole("button", { name: "Favorite" })).toBeDefined();
  });

  it("renders `Remove Favorite` button", () => {
    render(<Favorite favorite={true} />);
    expect(
      screen.getByRole("button", { name: "Remove Favorite" }),
    ).toBeDefined();
  });

  it("renders empty heart if not in favorite", () => {
    render(<Favorite />);
    expect(screen.getByTestId("favorite-empty")).toBeDefined();
  });

  it("renders filled heart if in favorite", () => {
    render(<Favorite favorite={true} />);
    expect(screen.getByTestId("favorite-filled")).toBeDefined();
  });

  it("toggles button text and heart icon when clicked", async () => {
    render(<Favorite />);
    const button = screen.getByRole("button", { name: "Favorite" });
    expect(screen.getByTestId("favorite-empty")).toBeDefined();
    expect(button).toBeDefined();
    await fireEvent.click(button);
    expect(screen.getByTestId("favorite-filled")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Remove Favorite" }),
    ).toBeDefined();
  });
});
