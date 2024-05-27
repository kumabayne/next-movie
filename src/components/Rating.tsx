export default function Rating({
  rating,
  fixed = 1,
}: {
  rating: number;
  fixed?: number;
}) {
  return (
    <p className="text-pink-500 font-bold rounded-sm shadow text-xs md:text-sm md:font-bold">
      {rating.toFixed(fixed)}
    </p>
  );
}
