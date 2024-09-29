import { Recommendations as RecommendationsType } from "../types/shared";
import MediaCard from "./MediaCard";
import Swiper from "./Swiper";

export default function Recommendations({
  recommendations,
}: {
  recommendations: RecommendationsType;
}) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2 text-white text-lg">Recommendations</h2>
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
