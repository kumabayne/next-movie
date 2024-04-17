import { PropsWithChildren } from "react";

export default function Grid(props: PropsWithChildren) {
  return (
    <div data-testid="grid" className="gap-6 grid grid-cols-12">
      {props.children}
    </div>
  );
}
