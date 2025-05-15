"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

export default function SelectNav({ items }: { items: string[] }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      onValueChange={(value) => {
        router.push(`${pathname}#${value}`);
      }}
    >
      <SelectTrigger>Jump to section</SelectTrigger>
      <SelectContent>
        <SelectItem value="Cast">Cast</SelectItem>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
