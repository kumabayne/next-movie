export default function KeywordCard({
  keyword,
}: {
  keyword: {
    id: number;
    name: string;
  };
}) {
  return (
    <div className="bg-indigo-600 font-medium p-1 rounded text-zinc-200 text-sm">
      {keyword.name}
    </div>
  );
}
