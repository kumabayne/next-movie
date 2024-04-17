import clsx from "clsx";
import { Images, Videos } from "../types/media";
import Tabs from "./Tabs";

export default function Media({
  className = "",
  images,
  videos,
}: {
  className?: string;
  images: Images;
  videos: Videos;
}) {
  const data = {
    Videos: videos.results,
    Backdrops: images.backdrops,
  };

  return (
    <div className={clsx(className && className)}>
      <div className="mb-2">
        <h2 className="font-semibold text-zinc-100">Media</h2>
      </div>
      <Tabs data={data} />
    </div>
  );
}
