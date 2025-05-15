import Container from "@/components/container";
import Person from "@/components/person";
import SelectNav from "@/components/select-nav";
import Typography from "@/components/typography";
import { CastType, CrewType } from "@/types/people";
import { Fragment } from "react";

async function getData(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MovieReviewsPage(props: {
  params: Promise<{ id: string; section: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const data: { cast: CastType[]; crew: CrewType[] } = await getData(id);

  const departments: { [key: string]: number } = {};
  const reducedDepartments = data.crew.reduce((prev: string[], current) => {
    if (!prev.includes(current.department)) {
      prev.push(current.department);
    }
    return prev;
  }, []);
  const sortedDepartments = reducedDepartments.sort((a, b) =>
    a.localeCompare(b),
  );
  const reducedCrew = data.crew.reduce(
    (prev: { [key: string]: CrewType }, current) => {
      if (current.id in prev) {
        return {
          ...prev,
          [current.id]: {
            ...prev[current.id],
            job: `${prev[current.id].job}, ${current.job}`,
          },
        };
      }
      return {
        ...prev,
        [current.id]: current,
      };
    },
    {},
  );
  const crew: CrewType[] | [] = Object.values(reducedCrew);
  const sortedCrew = crew
    .sort((a, b) => a.job.localeCompare(b.job))
    .sort((a, b) => a.department.localeCompare(b.department));

  return (
    <main className="pt-16 lg:pt-6">
      <Container>
        <div className="space-y-4">
          <Typography as="h1">Credits</Typography>
          <div className="sticky top-0 z-10 bg-background py-2">
            <SelectNav items={sortedDepartments} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <Typography id="Cast" as="h2">
                Cast
              </Typography>
              {data.cast.map((person) => (
                <Person key={person.id} person={person} variant="horizontal" />
              ))}
            </div>
            <div className="space-y-3">
              {sortedCrew.map((person) => {
                if (person.department in departments) {
                  return (
                    <Person
                      key={person.id}
                      person={person}
                      variant="horizontal"
                    />
                  );
                }
                departments[person.department] = 1;
                return (
                  <Fragment key={person.id}>
                    <Typography as="h2" id={person.department}>
                      {person.department}
                    </Typography>
                    <Person
                      key={person.id}
                      person={person}
                      variant="horizontal"
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
