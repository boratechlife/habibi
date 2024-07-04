import {
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import Swiper from "swiper";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";

import { isServer } from "@builder.io/qwik/build";

import navigationStyles from "swiper/css/navigation?inline";
import scrollbarStyles from "swiper/css/scrollbar?inline";

import { SiteDataContext } from "~/routes/layout";
import {
  ArcadeSvg,
  FavoriteSvg,
  FishSvg,
  LiveCasinoSvg,
  LotterySvg,
  SlotsSvg,
  TableSvg,
} from "~/components/Svgs";
import { useHandleClick } from "~/data/navigation";

export default component$(() => {
  useStylesScoped$(navigationStyles);
  useStylesScoped$(scrollbarStyles);

  const siteData = useContext(SiteDataContext);

  const handleClick = useHandleClick();

  const banners =
    siteData.value.siteInfo.banners?.filter((rt: any) => rt.isShow) || [];

  useVisibleTask$(
    ({ cleanup }) => {
      if (isServer) {
        return;
      }

      const swiperIconsInstance = new Swiper(".banner-icons-swiper", {
        modules: [Navigation, Scrollbar],
        // slidesOffsetBefore: 20,
        navigation: {
          enabled: true,
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          enabled: true,
          el: ".swiper-scrollbar",
          dragSize: 50,
          draggable: true,
        },
        slidesPerView: 4,
        breakpoints: {
          768: {
            slidesPerView: 7,
            scrollbar: { enabled: false },
            // slidesOffsetBefore: 0,
          },
          1024: {
            navigation: { enabled: false },
          },
        },
      });

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
        swiperIconsInstance.destroy();
      });
    },
    // { eagerness: "visible" },
  );
  return (
    <div class="mx-2.5 mt-2 block overflow-x-hidden rounded-sm border border-solid border-sky-500 bg-[linear-gradient(#217cb1_0,#003f64_100%)]">
      <div class="">
        <div class="swiper banner-icons-swiper [--swiper-navigation-color:white] [--swiper-scrollbar-bg-color:transparent] [--swiper-scrollbar-drag-bg-color:#4c758d] [--swiper-scrollbar-sides-offset:28px]">
          <div class="swiper-wrapper max-md:pl-3">
            <div
              id="cat-99"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/99")}
            >
              <div style="pointer-events: none;">
                <FavoriteSvg />
                <p>favorite</p>
              </div>
            </div>
            <div
              id="cat-12"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/lobby")}
            >
              <div style="pointer-events: none;">
                <LotterySvg />
                <p>Lottery</p>
              </div>
            </div>
            <div
              id="cat-0"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/0")}
            >
              <div style="pointer-events: none;">
                <SlotsSvg />
                <p>Slots</p>
              </div>
            </div>
            <div
              id="cat-70"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/70")}
            >
              <div style="pointer-events: none;">
                <LiveCasinoSvg />
                <p>Live Casino</p>
              </div>
            </div>
            <div
              id="cat-9"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/9")}
            >
              <div style="pointer-events: none;">
                <ArcadeSvg />
                <p>Arcade</p>
              </div>
            </div>
            <div
              id="cat-7"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/7")}
            >
              <div style="pointer-events: none;">
                <FishSvg />
                <p>Fish</p>
              </div>
            </div>
            <div
              id="cat-1"
              class="icon-wrapper swiper-slide mx-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs text-gray-400 transition-all  duration-[0.3s] focus:rounded focus:no-underline"
              onClick$={() => handleClick("/games/1")}
            >
              <div style="pointer-events: none;">
                <TableSvg />
                <p>Table</p>
              </div>
            </div>
          </div>

          <div class="swiper-button-prev -translate-y-1/2"></div>
          <div class="swiper-button-next -translate-y-1/2"></div>

          <div class="swiper-scrollbar"></div>
        </div>
      </div>

      <div class="overflow-x-clip">
        <div class="swiper banner-swiper  h-[400px] w-screen lg:h-[600px] ">
          <div class="swiper-wrapper">
            {banners
              .filter((image: { isShow: any }) => image.isShow)
              .map(
                (
                  banner: {
                    imageurl: string | undefined;
                    index: string | number | null | undefined;
                    imagealt: string | undefined;
                  },
                  index: number,
                ) => (
                  <div
                    key={banner.index + "" + index}
                    class="swiper-slide relative  h-[400px] w-screen lg:h-[600px] "
                  >
                    <img
                      src={banner.imageurl}
                      loading="lazy"
                      alt={banner.imagealt}
                      height={600}
                      width={1200}
                      class=" absolute h-full w-full object-cover "
                    />
                  </div>
                ),
              )}
          </div>
        </div>
      </div>

      {/* <div class="overflow-x-clip">
        <div class="swiper banner-swiper">
          <div class="swiper-wrapper">
            {[banner1, banner2].map((BannerImage, index) => (
              <div class="swiper-slide" key={index}>
                <BannerImage class="h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
});
