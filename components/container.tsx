import { ReactNode } from "react";
import { clsx } from "clsx";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-testid="container"
      className={clsx(
        "container mx-auto px-4 md:px-4 lg:px-6",
        className && className,
      )}
    >
      {children}
    </div>
  );
}
