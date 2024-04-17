import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Keywords from "./Keywords";
import { keywords } from "../utils/test-data";

describe("Keywords", () => {
  it("renders heading", () => {
    render(<Keywords keywords={keywords} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Keywords"
    );
  });
});
