import { Recommendations as RecommendationsType } from "../types/movie";
import MediaCard from "./MediaCard";
import Swiper from "./Swiper";

export default function Recommendations({
  recommendations,
}: {
  recommendations: RecommendationsType;
}) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2 text-zinc-100">Recommendations</h2>
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
          <swiper-slide key={item.id} lazy="true" style={{ width: "80px" }}>
            <MediaCard key={item.id} item={item} />
          </swiper-slide>
        ))}
      </Swiper>
    </div>
  );
}
