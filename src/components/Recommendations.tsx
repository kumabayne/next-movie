import { Recommendations as RecommendationsType } from "../../types/shared";
import MediaCard from "../../components/media-card";
import Swiper from "./Swiper";
import MediaRow from "@/components/media-row";

export default function Recommendations({
  recommendations,
}: {
  recommendations: RecommendationsType;
}) {
  return (
    <div className="mb-4 mt-4">
      <MediaRow heading="Recommendations" data={recommendations} />
    </div>
  );
}
