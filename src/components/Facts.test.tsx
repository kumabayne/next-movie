import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { movieDetail } from "../utils/test-data";
import Facts from "./Facts";
import {
  convertLanguageCodeToFullName,
  convertNumberToDollars,
} from "../utils/helpers";

describe("ExternalLinks", () => {
  it("renders the status", () => {
    render(<Facts data={movieDetail} />);
    expect(screen.getByText(movieDetail.status)).toBeInTheDocument();
  });

  it("renders the original language", () => {
    const text = convertLanguageCodeToFullName(
      movieDetail.original_language,
      movieDetail.spoken_languages
    );
    render(<Facts data={movieDetail} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders budget", () => {
    const money = convertNumberToDollars(movieDetail.budget);
    render(<Facts data={movieDetail} />);
    expect(screen.getByText(money)).toBeInTheDocument();
  });

  it("renders revenue", () => {
    const money = convertNumberToDollars(movieDetail.revenue);
    render(<Facts data={movieDetail} />);
    expect(screen.getByText(money)).toBeInTheDocument();
  });
});
