"use client";

import { MovieType } from "@/types/movie";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MediaCard from "./media-card";
import { getMediaByCategory } from "@/lib/actions";
import { IconLoader2 } from "@tabler/icons-react";

export default function MediaFeed({
  category,
  initialItems,
  type,
}: {
  category: string;
  initialItems: { results: MovieType[] };
  type: string;
}) {
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(initialItems.results);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const data = await getMediaByCategory(category, type, page);
      if (data.total_pages === page || data.results.length === 0) {
        setHasMore(false);
      }
      setItems([...items, ...data.results]);
      setPage(page + 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <InfiniteScroll
      className="grid grid-cols-2 justify-between gap-4 !overflow-hidden md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-6"
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="col-span-full flex justify-center">
          <IconLoader2 className="animate-spin" />
          <span className="sr-only">Loading...</span>
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          You&apos;ve reached the end of the list.
        </p>
      }
    >
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type="movie" />
      ))}
    </InfiniteScroll>
  );
}
