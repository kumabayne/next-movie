import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Person from "./Person";
import { slugify } from "../utils/helpers";
import { Cast, Crew } from "../types/people";

describe("Person", () => {
  const cast: Cast = {
    adult: false,
    gender: 2,
    id: 16828,
    known_for_department: "Acting",
    name: "Chris Evans",
    original_name: "Chris Evans",
    popularity: 57.247,
    profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
    cast_id: 5,
    character: "Steve Rogers / Captain America",
    credit_id: "52fe4313c3a36847f8038851",
    order: 0,
  };

  const crew: Crew = {
    adult: false,
    gender: 2,
    id: 4945,
    known_for_department: "Directing",
    name: "Joe Johnston",
    original_name: "Joe Johnston",
    popularity: 21.452,
    profile_path: "/fbGZo6CG9Z9zKFh8D5wHunyu7gJ.jpg",
    credit_id: "52fe4313c3a36847f803884d",
    department: "Directing",
    job: "Director",
  };

  it("renders a link to person page", () => {
    render(<Person person={cast} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/person/${cast.id}/${slugify(cast.name)}`
    );
  });

  it("renders an image if profile_path exists", () => {
    render(<Person person={cast} />);
    expect(screen.getByAltText(cast.name)).toBeInTheDocument();
  });

  it("renders a 67x100 image if person is part of grid", () => {
    render(<Person grid={true} person={cast} />);
    expect(screen.getByAltText(cast.name)).toHaveAttribute("width", "67");
    expect(screen.getByAltText(cast.name)).toHaveAttribute("height", "100");
  });

  it("renders a 120x80 image if person is not part of grid", () => {
    render(<Person person={cast} />);
    expect(screen.getByAltText(cast.name)).toHaveAttribute("width", "120");
    expect(screen.getByAltText(cast.name)).toHaveAttribute("height", "80");
  });

  it("renders silhouette icon if profile_path doesn't exist", () => {
    cast.profile_path = null;
    render(<Person person={cast} />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });

  it("renders the persons name", () => {
    render(<Person person={cast} />);
    expect(screen.getByText(/Chris Evans/i)).toBeInTheDocument();
  });

  it("renders the persons character if person is cast memeber", () => {
    render(<Person person={cast} />);
    expect(
      screen.getByText(/Steve Rogers \/ Captain America/i)
    ).toBeInTheDocument();
  });

  it("renders the persons job if person is crew member", () => {
    render(<Person person={crew} />);
    expect(screen.getByText(/Director/i)).toBeInTheDocument();
  });

  it("renders information icon if component is part of grid", () => {
    render(<Person grid={true} person={cast} />);
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
  });
});
