import clsx from "clsx";
import { Keyword } from "../../types/shared";
import KeywordCard from "./KeywordCard";

export default function Keywords({
  className,
  keywords,
}: {
  className?: string;
  keywords: Keyword[];
}) {
  return (
    <div className={clsx(className && className)}>
      <h2 className="mb-2 text-lg font-semibold text-white">Keywords</h2>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <KeywordCard key={keyword.id} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}
