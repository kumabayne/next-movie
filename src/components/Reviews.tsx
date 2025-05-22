"use client";

import { useState } from "react";
import { Reviews as ReviewsType } from "../../types/reviews";
import Review from "../../components/review";
import { useParams } from "next/navigation";

export default function Reviews({
  className,
  data,
}: {
  className?: string;
  data: ReviewsType;
}) {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(data.results);
  const params = useParams<{ id: string }>();
  // const firstReview = reviews.results[0];

  const handleClick = async () => {
    const nextPage = page + 1;
    const res = await fetch(`/reviews?id=${params.id}&page=${nextPage}`);
    const data = await res.json();
    setPage(nextPage);
    setReviews(reviews.concat(data.data.results));
  };

  return (
    <div className="mb-4 grid gap-4">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
      {data.total_pages > page && (
        <button
          className="rounded-sm bg-pink-500 px-2 py-1 text-sm font-semibold text-white"
          onClick={handleClick}
          type="button"
        >
          Load More Reviews
        </button>
      )}
    </div>
  );
}
