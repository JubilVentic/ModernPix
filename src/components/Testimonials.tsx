"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const reviews = [
  {
    name: "Precious Gift Canovas - Betita",
    quote:
      "Super worth it! The photobooth was great, and the team was very accommodating and kind. Highly recommended!",
  },
  {
    name: "Hannah Mae Radjac - Tano",
    quote:
      "Thank you for making our event extra special with your amazing Photobooth experience.",
  },
  {
    name: "Grace Medina Yonson",
    event: "Wedding",
    quote:
      "The best!! Our guests had so much fun and really enjoyed the photobooth. Thank you, Modern Pix!",
  },
  {
    name: "Hayari Treats",
    event: "Wedding",
    quote:
      "Wonderful giveaways, friendly staff, and responsive online support. Prices stayed fair even years after we first inquired.",
  },
  {
    name: "Chan Nahuman",
    event: "Wedding",
    quote:
      "Thank you for making our wedding more memorable. The owner is very approachable.",
  },
  {
    name: "Francine Carmelie Gaston",
    event: "60th Birthday",
    quote:
      "So happy with how Modern Pix captured the fun at my mom’s 60th! Great layout, amazing quality, and our guests loved every snap.",
  },
  {
    name: "Angelica Amores",
    quote:
      "Nice ang quality sa photos. Very professional and accommodating ang ga assist. Highly recommended!",
  },
  {
    name: "Evelyn Ong",
    quote:
      "From inquiry to execution — and even after-event follow-up — everything was smooth. The onsite team was professional and accommodating.",
  },
  {
    name: "Jihan Paterno Puyos",
    quote:
      "The enclosed photobooth is just perfect!!! Plus their attendants are very accommodating. Thank you so so much!",
  },
];

const slides = [...reviews, ...reviews];

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand-magenta" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="overflow-x-clip bg-[#f7f9fc] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-brand-navy md:text-4xl lg:text-5xl">
          TESTIMONIALS
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-brand-navy/70 md:text-lg">
          Real recommendations from couples and event hosts across Mindanao.
        </p>
      </div>

      <div className="mt-12">
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          slidesPerView="auto"
          spaceBetween={20}
          speed={8000}
          allowTouchMove
          grabCursor
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="testimonials-swiper !overflow-visible !px-5 md:!px-8"
        >
          {slides.map((review, index) => (
            <SwiperSlide
              key={`${review.name}-${index}`}
              className="!h-auto !w-[300px] sm:!w-[340px] md:!w-[380px]"
            >
              <blockquote className="flex h-full min-h-[240px] flex-col rounded-[1.5rem] bg-white px-6 py-7 shadow-[0_12px_40px_rgba(2,54,129,0.08)] ring-1 ring-brand-navy/5">
                <Stars />
                <p className="mt-4 flex-1 text-base leading-relaxed text-brand-navy/90">
                  “{review.quote}”
                </p>
                <footer className="mt-6 border-t border-brand-navy/10 pt-4">
                  <cite className="not-italic text-sm font-semibold text-brand-navy">
                    {review.name}
                  </cite>
                  {review.event ? (
                    <p className="mt-1 text-xs font-medium tracking-wide text-brand-magenta uppercase">
                      {review.event}
                    </p>
                  ) : null}
                </footer>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
