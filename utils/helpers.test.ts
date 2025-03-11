import { calculateAge, slugify } from "./helpers";
import { personDead } from "./test-data";

describe("helpers", () => {
  it("converts a string into a kabob case slug", () => {
    const slug = slugify("Movie Title");
    expect(slug).toContain("movie-title");
  });

  it("calculates age of person", () => {
    const age = calculateAge(personDead.birthday, personDead.deathday);
    expect(age).toBe(79);
  });
});
