import clsx from "clsx";
import { Images } from "../types/media";
import MediaGallery from "./media-gallery";
import Typography from "./typography";

export default function Media({
  className = "",
  images,
}: {
  className?: string;
  images: Images;
}) {
  const data = {
    Backdrops: images.backdrops,
  };

  return (
    <div className={clsx(className && className)}>
      <div className="mb-2">
        <Typography as="h2">Media</Typography>
      </div>
      <MediaGallery data={data} />
    </div>
  );
}
