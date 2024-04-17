import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExternalLinks from "./ExternalLinks";
import { externalIds, movieDetail } from "../utils/test-data";

describe("ExternalLinks", () => {
  it("renders a facebook link", () => {
    render(
      <ExternalLinks
        externalIds={externalIds}
        homepage={movieDetail.homepage}
      />
    );
    expect(screen.getByTestId("facebook")).toHaveAttribute(
      "href",
      `https://facebook.com/${externalIds.facebook_id}`
    );
  });

  it("renders a twitter link", () => {
    render(
      <ExternalLinks
        externalIds={externalIds}
        homepage={movieDetail.homepage}
      />
    );
    expect(screen.getByTestId("twitter")).toHaveAttribute(
      "href",
      `https://twitter.com/${externalIds.twitter_id}`
    );
  });

  it("renders a instagram link", () => {
    render(
      <ExternalLinks
        externalIds={externalIds}
        homepage={movieDetail.homepage}
      />
    );
    expect(screen.getByTestId("instagram")).toHaveAttribute(
      "href",
      `https://instagram.com/${externalIds.instagram_id}`
    );
  });

  it("renders a homepage link", () => {
    render(
      <ExternalLinks
        externalIds={externalIds}
        homepage={movieDetail.homepage}
      />
    );
    expect(screen.getByTestId("homepage")).toHaveAttribute(
      "href",
      movieDetail.homepage
    );
  });
});
