import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const carouselList: {
  title: string;
  recent_results: number[];
  num: string;
  time: string;
}[] = [
  {
    title: "SINGAPORE1",
    recent_results: [2, 2, 2, 1],
    num: "1710152527",
    time: "05:57:16",
  },
  {
    title: "HONGKONG1",
    recent_results: [7, 9, 8, 9],
    num: "1710152563",
    time: "11:12:16",
  },
  {
    title: "SYDNEY1",
    recent_results: [6, 0, 1, 6],
    num: "1710152587",
    time: "01:57:16",
  },
];

export default component$(() => {
  useTask$(
    ({ cleanup }) => {
      if (isServer) {
        return;
      }

      const swiperInstances: Swiper[] = [];

      (
        [...document.querySelectorAll(".carousel-swiper")] as HTMLElement[]
      ).forEach((el, index) => {
        swiperInstances.push(
          new Swiper(el, {
            modules: [Autoplay],
            loop: true,
            autoplay: {
              delay: 3000 + index * 1200,
            },
            slidesPerView: 2,
            breakpoints: {
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            },
          }),
        );
      });

      cleanup(() => {
        swiperInstances.forEach((swiper) => {
          swiper.destroy();
        });
      });
    },
    { eagerness: "visible" },
  );

  return (
    <div class="space-y-2 px-5 py-3">
      <div class="swiper carousel-swiper">
        <div class="swiper-wrapper">
          {[...carouselList, ...carouselList].map((item, index) => (
            <div
              class={[
                "swiper-slide",
                index + 1 > carouselList.length && "lg:!hidden",
              ]}
              key={index}
            >
              <div class="w-11/12 rounded-xl border border-solid border-sky-500 bg-sky-900">
                <p class="mb-3 w-full text-center text-neutral-200">
                  {item.title}
                </p>
                <p class="mb-3 w-full text-center text-sm text-sky-500">
                  {item.recent_results.join("-")}
                </p>
                <p class="mb-3 w-full text-center text-sm text-yellow-500">
                  {item.num}
                </p>
                <p class="mb-3  w-full text-center text-green-300">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="swiper carousel-swiper">
        <div class="swiper-wrapper">
          {[...carouselList, ...carouselList].map((item, index) => (
            <div
              class={[
                "swiper-slide",
                index + 1 > carouselList.length && "lg:!hidden",
              ]}
              key={index}
            >
              <div class="w-11/12 rounded-xl border border-solid border-sky-500 bg-sky-900">
                <p class="mb-3 w-full text-center text-neutral-200">
                  {item.title}
                </p>
                <p class="mb-3 w-full text-center text-sm text-sky-500">
                  {item.recent_results.join("-")}
                </p>
                <p class="mb-3 w-full text-center text-sm text-yellow-500">
                  {item.num}
                </p>
                <p class="mb-3  w-full text-center text-green-300">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
