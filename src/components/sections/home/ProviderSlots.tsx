import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isDev, isServer } from "@builder.io/qwik/build";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

const providerImages = import.meta.glob("/src/media/providers/*", {
  import: "default",
  query: "?url",
  eager: !isDev,
});

export default component$(() => {
  const images = useSignal<
    {
      imgSrc: string;
      title: string;
    }[]
  >();

  const loadProviders = $(async () => {
    const res = await Promise.all(
      Object.keys(providerImages).map(async (key) => {
        return {
          imgSrc: (await providerImages[key]()) as string,
          title: key.split("/").pop()!.split(".")[0],
        };
      }),
    );

    images.value = res;
  });

  useTask$(
    ({ cleanup }) => {
      if (isServer) {
        return;
      }
      loadProviders();

      const swiperInstance = new Swiper(".provider-swiper", {
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 3000,
        },
        slidesPerView: 5,
      });

      cleanup(() => {
        swiperInstance.destroy();
      });
    },
    { eagerness: "visible" },
  );

  return (
    <div class="px-5 py-3">
      <div class="rounded-xl border border-solid border-sky-500 bg-sky-800 text-white">
        <div class="flex p-2 text-xs">
          <p>🎰 Provider Slots</p>
          <div class="grow"> </div>
        </div>

        <div class="swiper provider-swiper">
          <div class="swiper-wrapper">
            {images.value?.map(({ imgSrc, title }, index) => (
              <div key={index} class="swiper-slide">
                <div class="w-11/12 rounded-xl border border-solid border-sky-500 bg-sky-900">
                  <img
                    src={imgSrc}
                    height={48}
                    width={48}
                    class="mx-auto h-12 w-12 p-1"
                    alt={`${title} logo`}
                  />
                  <p class="block rounded-bl-xl rounded-br-xl bg-[linear-gradient(#217cb1_0,#003f64_100%)] p-1 text-center text-[0.5rem] uppercase">
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
