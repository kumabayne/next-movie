import { HeartIcon } from "@heroicons/react/24/outline";

export default function Favorite() {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className="flex gap-1 items-center text-sm text-white"
      onClick={handleClick}
      type="button"
    >
      <HeartIcon className="w-5 h-5" />
      Favorite
    </button>
  );
}
