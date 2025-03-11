import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Typography({
  children,
  as = "p",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
}) {
  const As = as;

  return (
    <As
      className={cn(
        as === "h1" &&
          "text-lg font-semibold sm:text-2xl md:text-3xl md:font-bold xl:text-4xl",
        as === "h2" && "text-lg font-semibold sm:text-xl md:text-2xl",
        className && className,
      )}
    >
      {children}
    </As>
  );
}
