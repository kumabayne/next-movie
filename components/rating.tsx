import { cn } from "@/lib/utils";
import { IconStarFilled } from "@tabler/icons-react";

export default function Rating({
  rating,
  className,
  fixed = 1,
}: {
  rating: number;
  className?: string;
  fixed?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1", className && className)}>
      <IconStarFilled className="h-4 w-4" />
      <span className="text-xs font-medium md:text-sm lg:text-base">
        {rating.toFixed(fixed)}
      </span>
    </div>
  );
}
