import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const page = searchParams.get("page");
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
