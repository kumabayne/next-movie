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
            Cast
            <IconChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
          </Typography>
        </Link>
      </div>
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent className="-ml-2">
          {cast.map((item: CastType) => (
            <CarouselItem
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-[152px] pl-2 sm:basis-[168px]"
            >
              <Person person={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
