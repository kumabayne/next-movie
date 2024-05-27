import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function Watchlist() {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="text-white text-sm flex gap-1 items-center"
      onClick={handleClick}
      type="button"
    >
      <BookmarkIcon className="w-5 h-5" /> Watch Later
    </button>
  );
}
