"use client";

import useEmblaCarousel from "embla-carousel-react";
import HeroCard from "./hero-card";
import { MoviesType, MovieType } from "@/types/movie";
import { MouseEvent, useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import ClassNames from "embla-carousel-class-names";

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export default function Hero({ data }: { data: MoviesType }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

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

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const element = e.currentTarget;
    if (
      element.classList.contains("is-in-view") &&
      !element.classList.contains("is-snapped")
    ) {
      const nextSibling = element.nextElementSibling;
      const prevSibling = element.previousElementSibling;

      if (prevSibling && prevSibling.classList.contains("is-snapped")) {
        emblaApi?.scrollNext();
        return;
      }

      if (nextSibling && nextSibling.classList.contains("is-snapped")) {
        emblaApi?.scrollPrev();
        return;
      }

      if (!prevSibling) {
        emblaApi?.scrollNext();
        return;
      }

      if (!nextSibling) {
        emblaApi?.scrollPrev();
        return;
      }
    }
  }

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
                  <div
                    className="embla__slide"
                    key={item.id}
                    onClick={handleClick}
                  >
                    <div className="embla__slide__number">
                      <HeroCard item={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
