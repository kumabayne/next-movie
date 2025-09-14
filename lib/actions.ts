"use server";

export async function getMediaByCategory(
  category: string,
  type: string,
  page: number,
) {
  const data = await fetch(
    `${process.env.TMDB_URL}/${type}/${category}?language=en-US&page=${page + 1}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    },
  );
  return data.json();
}
