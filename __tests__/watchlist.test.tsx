import Watchlist from "@/components/watchlist";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Watchlist", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders `Watch Later` button", () => {
    render(<Watchlist />);
    expect(screen.getByRole("button", { name: "Watch Later" })).toBeDefined();
  });

  it("renders `Remove Watchlist` button", () => {
    render(<Watchlist inWatchlist={true} />);
    expect(
      screen.getByRole("button", { name: "Remove Watchlist" }),
    ).toBeDefined();
  });

  it("renders empty bookmark if not in watchlist", () => {
    render(<Watchlist />);
    expect(screen.getByTestId("watchlist-empty")).toBeDefined();
  });

  it("renders filled bookmark if in watchlist", () => {
    render(<Watchlist inWatchlist={true} />);
    expect(screen.getByTestId("watchlist-filled")).toBeDefined();
  });

  it("toggles button text and bookmark icon when clicked", async () => {
    render(<Watchlist />);
    const button = screen.getByRole("button", { name: "Watch Later" });
    expect(screen.getByTestId("watchlist-empty")).toBeDefined();
    expect(button).toBeDefined();
    await fireEvent.click(button);
    expect(screen.getByTestId("watchlist-filled")).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Remove Watchlist" }),
    ).toBeDefined();
  });
});
