import {
  $,
  Signal,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./index-styles.css?inline";
import Carousel from "~/components/sections/home/Carousel";
import ScrollingBanner from "~/components/sections/home/ScrollingBanner";
import ProviderSlots from "~/components/sections/home/ProviderSlots";

import ReadMoreImage from "~/media/read-more-animated.webp?jsx";

import "swiper/css";
import BaseLayout from "~/components/common/BaseLayout";
import { SeoInterface, GamesI } from "~/interfaces";
import { SiteDataContext, ThemeContext } from "./layout";

export interface ShownPoolsInterface {
  pasaran_id: string;
  pasaran_name: string;
  hours: string;
  minutes: string;
  seconds: string;
  pasaran_active: boolean;
  recent_results: any; // Adjust this type based on actual data structure
}

export interface GetPasaranResponseI {
  pasaran_id: string;
  pasaran_name: string;
  pasaran_active: boolean;
  daily_closetime: string;
  recent_results: any; // Adjust this type based on actual data structure
}

export interface SiteInfoState {
  siteInfo: SeoInterface | null;
  siteGames: GamesI | null;
  data: any | null;
}

export const parasanContext = createContextId<Signal<ShownPoolsInterface[]>>(
  "docs.parasan-context",
);

export default component$(() => {
  const theme = useContext(ThemeContext);
  const siteData = useContext(SiteDataContext);

  const livechat = siteData.value.siteInfo.footer_livechat;

  const runningTexts =
    siteData.value.siteInfo.runningText?.filter((rt: any) => rt.isShow) || [];

  // useTask$(async () => {
  //   const response = await fetch(`http://localhost:5173/api/test`);

  //   const data = await response.json();

  //   console.log("Data", data);
  //   state.data = data;
  //   // state.siteInfo = data.SiteInfo;
  //   // state.siteGames = data.SiteGames;
  // });

  useStylesScoped$(styles);
  return (
    <BaseLayout>
      <div class="bg-[linear-gradient(#217cb1_0,#003f64_100%)] pt-7">
        <div class="grid grid-cols-2 gap-12 px-2">
          <a
            class="mb-2.5 block h-11 min-w-fit rounded-full  border-0 bg-[linear-gradient(180deg,#ddf3ff_0,#1cadff_50%,#0073b3)] px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white shadow-[inset_0_0_0_0_#000,inset_-1px_-3px_0_0_#4dbeff,inset_0_2px_4px_2px_#5ac4ff,0_0_0_0_rgba(0,0,0,.2)]"
            href="/login"
          >
            Sign In
          </a>
          <a
            class="mb-2.5 block h-11 rounded-full border-0  bg-[linear-gradient(#00a5ff,#009bff_0,#004a73_110%)] px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white shadow-[inset_0_0_0_0_#000,_inset_0_-4px_0_0_#008bdc,_inset_0_5px_8px_0_#0e74b6,_0_0_0_0_rgba(0,0,0,.2)]"
            href="/register"
          >
            Sign Up
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="inline-block h-5 w-5"
            >
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </a>
        </div>
        <div class="flex bg-sky-900 p-2 text-xs text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            class="mr-2 h-5 w-5 text-sky-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            ></path>
          </svg>
          <div
            class="rfm-marquee-container"
            style="--pause-on-hover: running; --pause-on-click: running; --width: 100%; --transform: none;"
          >
            <div
              class="rfm-marquee"
              style="--play: running; --direction: normal; --duration: 81.7625s; --delay: 0s; --iteration-count: infinite; --min-width: 100%;"
            >
              {runningTexts.map(
                (
                  runningText: {
                    text: string;
                  },
                  index: number,
                ) => {
                  return (
                    <div class="rfm-initial-child-container" key={index}>
                      <div class="rfm-child" style="--transform: none;">
                        <span class="my-0.5">{runningText.text}</span>
                      </div>
                      <div class="rfm-child" style="--transform: none;">
                        ;
                      </div>
                    </div>
                  );
                },
              )}
            </div>
            <div
              class="rfm-marquee"
              style="--play: running; --direction: normal; --duration: 81.7625s; --delay: 0s; --iteration-count: infinite; --min-width: 100%;"
            >
              <div class="rfm-child" style="--transform: none;">
                <span class="my-0.5">
                  Selamat Datang di PAUS4D - situs terpercaya yang menyediakan
                  ratusan permainan slot online pasti gacor dan pasaran togel
                  terlengkap secara resmi menang pasti bayar. Tersedia 50
                  Pasaran Togel, 40 Live Game Casino, dan 8 Provider Slot Gacor.
                  Ayo Bergabung sekarang juga di PAUS4D dan nikmati Hadiah
                  terbesar dan Bonus Menarik!
                </span>
              </div>
              <div class="rfm-child" style="--transform: none;">
                ;
              </div>
            </div>
          </div>
        </div>

        <Carousel />

        {siteData.value.siteInfo.banners.length > 0 && <ScrollingBanner />}

        <div class="my-2">
          <div class="px-5">
            <div class="">
              <a
                class="mb-2.5 block h-11 min-w-fit rounded-full border-0 bg-[linear-gradient(#00a5ff,#009bff_0,#004a73_110%)] px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white shadow-[inset_0_0_0_0_#000,inset_0_-4px_0_0_#008bdc,inset_0_5px_8px_0_#0e74b6,0_0_0_0_rgba(0,0,0,.2)]"
                rel="dofollow"
                id="highlight"
                style="font-weight:bold"
                href="/en/promotions"
              >
                Promo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="inline-block h-5 w-5"
                >
                  <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z"></path>
                </svg>
              </a>
            </div>
            <p class="mb-2 mt-3 text-center">
              <span
                class="text-md font-bold text-white"
                style="text-shadow:0px 0px 20px #000000, 0px 0px 5px #000000"
              >
                Klik Untuk Menghubungi CS PAUS4D:
              </span>
            </p>
            <div>
              <button class="inline-block h-[35px] w-full min-w-[43%] animate-[change-color_.5s_ease_0s_infinite_normal_none_running] rounded-xl border border-solid border-yellow-600 bg-yellow-600 bg-[linear-gradient(#4a4a4a_0,#484848_50%,#000_95%)] px-0 pb-6 pt-2.5 text-center uppercase leading-[14px] text-black shadow-[inset_0_0_0_2px_#daa520,inset_0_2px_0_0_#daa520,inset_0_4px_4px_2px_#434343,3px_3px_3px_1px_transparent] active:bg-amber-700">
                <span dangerouslySetInnerHTML={livechat}></span>
                Live Chat
              </button>
            </div>
          </div>
        </div>

        <ProviderSlots />

        <div class="px-5">
          <div class="rounded-xl border border-solid border-sky-500 bg-sky-800">
            <p class="text-center text-lg font-semibold uppercase text-white">
              layanan kami
            </p>
            <div class="border border-solid border-sky-700"></div>
            <div class="mt-0 flex w-full gap-x-2 bg-transparent px-2 pb-3 pt-2 text-center text-white">
              <div class="inline-block w-1/3 rounded-xl border border-solid border-sky-500 bg-[linear-gradient(#217cb1_0,#003f64_100%)]">
                <p class="rounded-tl-xl rounded-tr-xl bg-sky-900 p-1 text-xs uppercase">
                  DEPSOSIT
                </p>
                <div class="mt-1">
                  <p class="text-center text-xs">Rata-rata</p>
                  <p class="text-2xl font-extrabold">1</p>
                  <p class="text-lg">Menit</p>
                  <div class="mx-1 mb-1 mt-0 rounded-lg border border-solid border-[#1f8ed5] bg-[#0d5684] p-1">
                    <div class="progress-bar h-2.5 w-1/4 rounded-lg bg-[linear-gradient(90deg,#bd8700,#f9b200,#ffc32d)]"></div>
                  </div>
                </div>
              </div>
              <div class="inline-block w-1/3 rounded-xl border border-solid border-sky-500 bg-[linear-gradient(#217cb1_0,#003f64_100%)]">
                <p class="rounded-tl-xl rounded-tr-xl bg-sky-900 p-1 text-xs uppercase">
                  Cash Out
                </p>
                <div class="mt-1">
                  <p class="text-center text-xs">Rata-rata</p>
                  <p class="text-2xl font-extrabold">3</p>
                  <p class="text-lg">Menit</p>
                  <div class="mx-1 mb-1 mt-0 rounded-lg border border-solid border-[#1f8ed5] bg-[#0d5684] p-1">
                    <div class="progress-bar h-2.5 w-2/5 rounded-lg bg-[linear-gradient(90deg,#bd8700,#f9b200,#ffc32d)]"></div>
                  </div>
                </div>
              </div>
              <div class="inline-block w-1/3 rounded-xl border border-solid border-sky-500 bg-[linear-gradient(#217cb1_0,#003f64_100%)]">
                <p class="rounded-tl-xl rounded-tr-xl bg-sky-900 p-1 text-xs uppercase">
                  login hari ini
                </p>
                <div class="mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    class="mx-auto h-10 w-10 rounded-full border-2 border-solid border-sky-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"></path>
                  </svg>
                  <div class="mt-1 text-center">
                    <p class="text-xl font-extrabold text-amber-400">
                      {Math.floor(Math.random() * (7293 - 2800 + 1)) + 2800}
                    </p>
                    <p class="text-xs">Member Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-5 py-3">
          <details>
            <summary class="text-center text-lg text-white">Read Less</summary>
            <footer>
              <div class="px-5 text-white">
                <div class="container mx-auto md:flex md:max-w-7xl md:flex-row">
                  <div class="my-2 w-full place-content-start">
                    <div class="footer-content"></div>
                  </div>
                </div>
                <div class="text-center text-sm ">
                  Rating: ⭐⭐⭐⭐⭐ Skor: 98,5% · 9,697,689 User
                </div>

                <ReadMoreImage
                  class="h-auto w-full py-3"
                  alt="animated images"
                />
              </div>
            </footer>
          </details>
        </div>
      </div>
    </BaseLayout>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "",
    },
  ],
};
