import MobileNav from "@/components/mobile-nav";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("MobileNav", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders navigation", () => {
    render(<MobileNav />);
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("renders Home link", () => {
    render(<MobileNav />);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/");
  });

  it("renders Movies link", () => {
    render(<MobileNav />);
    const link = screen.getByRole("link", { name: "Movies" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/movies");
  });

  it("renders TV link", () => {
    render(<MobileNav />);
    const link = screen.getByRole("link", { name: "TV" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/tv");
  });

  it("renders People link", () => {
    render(<MobileNav />);
    const link = screen.getByRole("link", { name: "People" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/people");
  });

  it("renders Profile link", () => {
    render(<MobileNav />);
    const link = screen.getByRole("link", { name: "Profile" });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/profile");
  });
});
