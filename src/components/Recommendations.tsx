import { Recommendations as RecommendationsType } from "../../types/shared";
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
