import clsx from "clsx";
import { Keywords } from "../types/shared";
import KeywordCard from "./KeywordCard";

export default function Keywords({
  className,
  keywords,
}: {
  className?: string;
  keywords: Keywords;
}) {
  return (
    <div className={clsx(className && className)}>
      <h2 className="font-semibold mb-2 text-zinc-100">Keywords</h2>
      <div className="flex flex-wrap gap-2">
        {keywords.keywords.map((keyword) => (
          <KeywordCard key={keyword.id} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}
