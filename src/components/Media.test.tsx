import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Media from "./Media";
import { images, videos } from "../utils/test-data";

describe("Media", () => {
  it("renders a title", () => {
    render(<Media images={images} videos={videos} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /media/i
    );
  });
});
