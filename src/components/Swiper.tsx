"use client";
import { ReactNode, useEffect, useRef } from "react";
import { register, SwiperContainer } from "swiper/element/bundle";

import "swiper/css";
import "swiper/css/pagination";

type SwiperProps = {
  children: ReactNode;
  params?: {
    autoplay?: {
      delay?: number;
      disableOnInteraction: boolean;
    };
    effect?: string;
    fadeEffect?: {
      crossFade?: boolean;
    };
    injectStyles?: string[];
    pagination?: {
      dynamicBullets?: boolean;
    };
    slidesPerView?: string;
    spaceBetween?: number;
  };
};

register();

export default function Swiper({ children, params = {} }: SwiperProps) {
  const swiperElRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    // swiperElRef.current.addEventListener("swiperprogress", (e) => {
    //   const [swiper, progress] = e.detail;
    // });
    // swiperElRef.current.addEventListener("swiperslidechange", (e) => {
    // });
    if (swiperElRef.current) {
      // Assign it to swiper element
      Object.assign(swiperElRef.current, params);

      // initialize swiper
      swiperElRef.current.initialize();
    }
  }, [params]);

  return (
    <swiper-container ref={swiperElRef} init="false">
      {children}
    </swiper-container>
  );
}
