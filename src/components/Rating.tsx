export default function Rating({
  rating,
  fixed = 1,
}: {
  rating: number;
  fixed?: number;
}) {
  return (
    <p className="font-bold rounded-tr-sm rounded-bl-sm shadow text-[10px] bg-gradient-to-br from-blue-600 to-pink-600 px-1 md:text-sm">
      {rating.toFixed(fixed)}
    </p>
  );
}
