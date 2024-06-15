import { component$, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

import { isServer } from "@builder.io/qwik/build";

import navigationStyles from "swiper/css/navigation?inline";
import scrollbarStyles from "swiper/css/scrollbar?inline";

import banner1 from "~/media/Tournament.jpeg?jsx";
import banner2 from "~/media/CashDrop.jpeg?jsx";

export default component$(() => {
  useStylesScoped$(navigationStyles);
  useStylesScoped$(scrollbarStyles);

  useTask$(
    ({ cleanup }) => {
      if (isServer) {
        return;
      }

      const swiperInstance = new Swiper(".banner-swiper", {
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 3000,
        },
        slidesPerView: 1,
      });

      cleanup(() => {
        swiperInstance.destroy();
      });
    },
    { eagerness: "visible" },
  );
  return (
    <div class=" mt-2 block overflow-x-hidden rounded-sm  bg-[linear-gradient(#217cb1_0,#003f64_100%)]">
      <div class="overflow-x-clip">
        <div class="swiper banner-swiper">
          <div class="swiper-wrapper">
            {[banner1, banner2].map((BannerImage, index) => (
              <div class="swiper-slide" key={index}>
                <BannerImage class="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
