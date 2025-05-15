export default function KeywordCard({
  keyword,
}: {
  keyword: {
    id: number;
    name: string;
  };
}) {
  return (
    <div className="rounded border bg-white/10 px-2 py-1 text-sm font-medium text-white transition-colors duration-300 ease-in-out">
      {keyword.name}
    </div>
  );
}
