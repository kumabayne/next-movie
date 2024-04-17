import clsx from "clsx";
import { Genre } from "../types/genre";

export default function GenreCard({ item }: { item: Genre }) {
  return (
    <div
      className={clsx(
        "bg-orange-300 flex-col inline-flex items-center min-w-16 p-1 rounded text-orange-900",
        { "p-2": item.Icon }
      )}
    >
      {item.Icon && <item.Icon />}
      <p className="font-medium text-sm whitespace-nowrap">{item.name}</p>
    </div>
  );
}
