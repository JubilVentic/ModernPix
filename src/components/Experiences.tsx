"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

/** Portrait layouts only — mixed ratios break the 3D coverflow. */
const prints = [
  {
    src: "/images/carousel/angelo-dani.png",
    alt: "Angelo and Dani photobooth strips",
  },
  {
    src: "/images/carousel/zul-areej.png",
    alt: "Zul and Areej custom photobooth print",
  },
  {
    src: "/images/carousel/apple-jeric.png",
    alt: "Apple and Jeric custom photobooth print",
  },
  {
    src: "/images/carousel/justine-jumeica.png",
    alt: "Justine and Jumeica photobooth strips",
  },
  {
    src: "/images/carousel/kyeth-hannah.png",
    alt: "Kyeth and Hannah custom photobooth print",
  },
  {
    src: "/images/carousel/king-shen.png",
    alt: "King and Shen photobooth strips",
  },
  {
    src: "/images/carousel/apple-jeric-grid.png",
    alt: "Apple and Jeric grid photobooth print",
  },
  {
    src: "/images/carousel/salman-najihah.png",
    alt: "Salman and Najihah photobooth print",
  },
  {
    src: "/images/carousel/karl-kristine.png",
    alt: "Karl and Kristine photobooth print",
  },
  {
    src: "/images/carousel/ken-micah.png",
    alt: "Ken and Micah photobooth print",
  },
  {
    src: "/images/carousel/josh-april.png",
    alt: "Josh and April photobooth strips",
  },
  {
    src: "/images/carousel/gian-roxanne.png",
    alt: "Gian and Roxanne photobooth strips",
  },
  {
    src: "/images/carousel/king-shen-duo.png",
    alt: "King and Shen duo photobooth strips",
  },
];

const slides = [...prints, ...prints];

/** Higher = slower continuous drift */
const SPEED_NORMAL = 4500;
const SPEED_HOVER = 12000;

export function Experiences() {
  const swiperRef = useRef<SwiperType | null>(null);

  const setDriftSpeed = (speed: number) => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    swiper.params.speed = speed;
    swiper.autoplay.stop();
    swiper.autoplay.start();
  };

  return (
    <section className="overflow-x-clip bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
          OUR PHOTOBOOTH EXPERIENCES
        </h2>
      </div>

      <div
        className="experiences-carousel relative mx-auto mt-10 w-full md:mt-14"
        onMouseEnter={() => setDriftSpeed(SPEED_HOVER)}
        onMouseLeave={() => setDriftSpeed(SPEED_NORMAL)}
      >
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          loopAdditionalSlides={6}
          slidesPerView={3}
          breakpoints={{
            768: { slidesPerView: 5 },
            1280: { slidesPerView: 5 },
          }}
          spaceBetween={-24}
          watchSlidesProgress
          slideToClickedSlide
          speed={SPEED_NORMAL}
          allowTouchMove
          coverflowEffect={{
            rotate: 36,
            stretch: -40,
            depth: 140,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".experiences-next",
            prevEl: ".experiences-prev",
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onTouchStart={(swiper) => {
            swiper.autoplay?.stop();
          }}
          onTouchEnd={(swiper) => {
            window.setTimeout(() => {
              if (swiper.params.speed !== SPEED_HOVER) {
                swiper.params.speed = SPEED_NORMAL;
              }
              swiper.autoplay?.start();
            }, 120);
          }}
          className="experiences-swiper experiences-swiper-continuous !overflow-hidden !px-0 !pb-12 !pt-6"
        >
          {slides.map((print, index) => (
            <SwiperSlide
              key={`${print.src}-${index}`}
              className="experiences-slide !flex !h-auto !items-center !justify-center"
            >
              <div className="mx-auto aspect-[2/3] w-[92%] max-w-[340px] overflow-hidden rounded-md bg-white shadow-[0_22px_48px_rgba(2,54,129,0.2)] ring-1 ring-brand-navy/5">
                <Image
                  src={print.src}
                  alt={print.alt}
                  width={720}
                  height={1080}
                  quality={95}
                  sizes="(max-width: 768px) 40vw, 340px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : undefined}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          aria-label="Previous experience"
          className="experiences-prev absolute top-[42%] left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-navy/20 bg-white/85 text-xl text-brand-navy shadow-md backdrop-blur-md transition hover:bg-white md:left-8"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next experience"
          className="experiences-next absolute top-[42%] right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-navy/20 bg-white/85 text-xl text-brand-navy shadow-md backdrop-blur-md transition hover:bg-white md:right-8"
        >
          ›
        </button>
      </div>
    </section>
  );
}
