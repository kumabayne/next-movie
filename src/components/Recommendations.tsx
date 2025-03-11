import { Recommendations as RecommendationsType } from "../../types/shared";
import MediaCard from "../../components/media-card";
import Swiper from "./Swiper";

export default function Recommendations({
  recommendations,
}: {
  recommendations: RecommendationsType;
}) {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-lg font-semibold text-white">Recommendations</h2>
      <Swiper
        params={{
          injectStyles: [
            `
              .swiper-lazy-preloader {
                display: none;
              }
            `,
          ],
          slidesPerView: "auto",
          spaceBetween: 8,
        }}
      >
        {recommendations.results.map((item) => (
          // @ts-ignore
          <swiper-slide key={item.id} class="RecommendationSlide" lazy="true">
            <MediaCard key={item.id} item={item} />
          </swiper-slide>
        ))}
      </Swiper>
    </div>
  );
}
