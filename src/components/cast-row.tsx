"use client";

import Person from "../../components/person";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Typography from "@/components/typography";
import { CastType } from "@/types/people";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CastRow({
  cast,
  className,
}: {
  cast: CastType[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link href={`${pathname}/credits`}>
          <Typography as="h2" className="flex items-center gap-1">
            Cast <span className="text-[90%]">({cast.length})</span>
            <IconChevronRight className="h-4 w-4" />
          </Typography>
        </Link>
      </div>
      <Carousel>
        <CarouselContent className="-ml-2">
          {cast.map((item: CastType) => (
            <CarouselItem key={item.id} className="basis-[110px] pl-2">
              <Person person={item} grid={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
