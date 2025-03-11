import HamburgerMenu from "@/components/hamburger-menu";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("HamburgerMenu", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders open menu button", () => {
    render(<HamburgerMenu />);
    expect(screen.getByRole("button", { name: "Open Menu" })).toBeDefined();
  });

  it("renders title", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    expect(
      screen.getByRole("heading", { level: 2, name: "Navigation" }),
    ).toBeDefined();
  });

  it("renders description", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    expect(screen.getByTestId("hamburger-menu-description")).toBeDefined();
  });

  it("renders watch now button", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    expect(screen.getByRole("button", { name: "Watch Now" })).toBeDefined();
  });

  it("renders in theaters link", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    const watchNowBtn = screen.getByRole("button", { name: "Watch Now" });
    await fireEvent.click(watchNowBtn);
    expect(screen.getByRole("link", { name: "In Theaters" })).toBeDefined();
  });

  it("renders streaming link", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    const watchNowBtn = screen.getByRole("button", { name: "Watch Now" });
    await fireEvent.click(watchNowBtn);
    expect(screen.getByRole("link", { name: "Streaming" })).toBeDefined();
  });

  it("renders on tv link", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    const watchNowBtn = screen.getByRole("button", { name: "Watch Now" });
    await fireEvent.click(watchNowBtn);
    expect(screen.getByRole("link", { name: "On TV" })).toBeDefined();
  });

  it("renders for rent link", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    const watchNowBtn = screen.getByRole("button", { name: "Watch Now" });
    await fireEvent.click(watchNowBtn);
    expect(screen.getByRole("link", { name: "For Rent" })).toBeDefined();
  });

  it("renders movies button", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    expect(screen.getByRole("button", { name: "Movies" })).toBeDefined();
  });

  it("renders in theaters link", async () => {
    render(<HamburgerMenu />);
    const openMenuBtn = screen.getByRole("button", { name: "Open Menu" });
    await fireEvent.click(openMenuBtn);
    const watchNowBtn = screen.getByRole("button", { name: "Movies" });
    await fireEvent.click(watchNowBtn);
    expect(screen.getByRole("link", { name: "In Theaters" })).toBeDefined();
  });
});
