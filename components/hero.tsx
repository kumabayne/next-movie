"use client";

import useEmblaCarousel from "embla-carousel-react";
import HeroCard from "./hero-card";
import { MoviesType, MovieType } from "@/types/movie";
import { useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export default function Hero({ data }: { data: MoviesType }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className="mb-6 md:pb-6 xl:pb-8">
      <div className="xl:rounded-3xl">
        <div className="relative md:px-0">
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {data.results.map((item: MovieType) => (
                  <div className="embla__slide max-w-[1000px]" key={item.id}>
                    <div className="embla__slide__number">
                      <HeroCard item={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block">
              <button className="embla__prev" onClick={scrollPrev}>
                <CaretLeft className="h-16 w-16 text-white/50 drop-shadow-sm transition-colors duration-300 ease-in-out hover:text-white" />
                <span className="sr-only">Previous</span>
              </button>
            </div>
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block">
              <button className="embla__next" onClick={scrollNext}>
                <CaretRight className="h-16 w-16 text-white/50 drop-shadow-sm transition-colors duration-300 ease-in-out hover:text-white" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
