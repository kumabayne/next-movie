import Container from "@/components/container";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Container", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a div with container layout", () => {
    render(<Container>Test</Container>);
    const container = screen.getByTestId("container");
    expect(container.classList).toContain("container");
    expect(screen.getByText("Test")).toBeDefined();
  });

  it("renders a div with additional class names", () => {
    render(
      <Container className="mb-4">
        <></>
      </Container>,
    );
    const container = screen.getByTestId("container");
    expect(container.classList).toContain("mb-4");
  });
});
