import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Typography({
  children,
  as = "p",
  className,
  id,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
  id?: string;
}) {
  const As = as;

  return (
    <As
      id={id}
      className={cn(
        as === "h1" && "text-lg font-bold sm:text-xl md:text-2xl lg:text-4xl",
        as === "h2" && "text-md font-semibold md:text-xl lg:text-2xl",
        as === "h3" && "text-base font-semibold md:text-lg lg:text-xl",
        className && className,
      )}
    >
      {children}
    </As>
  );
}
