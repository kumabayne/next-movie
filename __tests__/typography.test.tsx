import Typography from "@/components/typography";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Typography", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders h1", () => {
    render(<Typography as="h1">Heading One</Typography>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Heading One" }),
    ).toBeDefined();
  });

  it("renders h2", () => {
    render(<Typography as="h2">Heading Two</Typography>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Heading Two" }),
    ).toBeDefined();
  });

  it("renders h3", () => {
    render(<Typography as="h3">Heading Three</Typography>);
    expect(
      screen.getByRole("heading", { level: 3, name: "Heading Three" }),
    ).toBeDefined();
  });

  it("renders h4", () => {
    render(<Typography as="h4">Heading Four</Typography>);
    expect(
      screen.getByRole("heading", { level: 4, name: "Heading Four" }),
    ).toBeDefined();
  });

  it("renders h5", () => {
    render(<Typography as="h5">Heading Five</Typography>);
    expect(
      screen.getByRole("heading", { level: 5, name: "Heading Five" }),
    ).toBeDefined();
  });

  it("renders h6", () => {
    render(<Typography as="h6">Heading Six</Typography>);
    expect(
      screen.getByRole("heading", { level: 6, name: "Heading Six" }),
    ).toBeDefined();
  });

  it("renders p", () => {
    render(<Typography as="p">Paragraph</Typography>);
    expect(screen.getByText("Paragraph")).toBeDefined();
  });
});
