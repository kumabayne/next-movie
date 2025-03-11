import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/mode-toggle";
import { cleanup, render, screen } from "@testing-library/react";
import { matchMediaMock } from "./mocks/matchMedia.mock";
import { afterEach, describe, expect, it } from "vitest";

matchMediaMock();

describe("ModeToggle", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders toggle button", () => {
    render(
      <ThemeProvider>
        <ModeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole("switch", { name: "Toggle Mode" })).toBeDefined();
  });
});
