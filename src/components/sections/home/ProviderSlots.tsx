/* eslint-disable qwik/no-use-visible-task */
import {
  $,
  component$,
  useContext,
  useSignal,
  // useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { isDev, isServer } from "@builder.io/qwik/build";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { SiteDataContext } from "~/routes/layout";

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

  const siteData = useContext(SiteDataContext);

  //object .keys to get gateories

  const availableProviders = Object.keys(siteData.value.SiteGames)
    .map((item) => {
      return siteData.value.SiteGames[item].list.map(
        (listItem: { provider: any; providerIdx: any }) => {
          return {
            provider: listItem.provider,
            providerIdx: listItem.providerIdx,
            imgsrc: `${import.meta.env.PUBLIC_IMAGE_URL}/providers/myballs/${listItem.provider}.webp`,
          };
        },
      );
    })
    .flat();

  // Use a Set to filter out duplicates based on provider
  const uniqueProviders = Array.from(
    new Map(availableProviders.map((item) => [item.provider, item])).values(),
  );

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

  useVisibleTask$(
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
    // { eagerness: "visible" },
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
            {uniqueProviders?.map(({ imgsrc, provider }, index) => (
              <div key={index} class="swiper-slide">
                <div class="w-11/12 rounded-xl border border-solid border-sky-500 bg-sky-900">
                  <img
                    src={imgsrc}
                    height={48}
                    width={48}
                    class="mx-auto h-12 w-12 p-1"
                    alt={`${provider} logo`}
                  />
                  <p class="block rounded-bl-xl rounded-br-xl bg-[linear-gradient(#217cb1_0,#003f64_100%)] p-1 text-center text-[0.5rem] uppercase">
                    {provider}
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
