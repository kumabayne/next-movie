export default function KeywordCard({
  keyword,
}: {
  keyword: {
    id: number;
    name: string;
  };
}) {
  return (
    <div className="bg-sky-500/20 font-medium px-2 py-1 rounded text-sky-500 text-sm hover:bg-sky-500/30 transition-colors ease-in-out duration-300">
      {keyword.name}
    </div>
  );
}
