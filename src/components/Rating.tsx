export default function Rating({
  rating,
  fixed = 1,
}: {
  rating: number;
  fixed?: number;
}) {
  return (
    <p className="bg-pink-500 font-semibold px-1 rounded-sm shadow text-zinc-100 text-xs">
      {rating.toFixed(fixed)}
    </p>
  );
}
