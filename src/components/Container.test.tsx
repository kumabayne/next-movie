import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Container from "./Container";

describe("Container", () => {
  it("renders a div with container layout", () => {
    render(
      <Container>
        <></>
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass(
      "container mx-auto px-4"
    );
  });

  it("renders a div with additional class names", () => {
    render(
      <Container className="mb-4">
        <></>
      </Container>
    );
    expect(screen.getByTestId("container")).toHaveClass(
      "container mx-auto px-4 mb-4"
    );
  });
});
