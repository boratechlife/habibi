import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { GetPasaranResponseI, ShownPoolsInterface } from "~/routes";
import { useGetPasaran } from "~/routes/layout";

// const carouselList: {
//   title: string;
//   recent_results: number[];
//   num: string;
//   time: string;
// }[] = [
//   {
//     title: "SINGAPORE1",
//     recent_results: [2, 2, 2, 1],
//     num: "1710152527",
//     time: "05:57:16",
//   },
// ];

export default component$(() => {
  const firstPools = useSignal<ShownPoolsInterface[]>([]);
  const secondPools = useSignal<ShownPoolsInterface[]>([]);
  const calculateCountdown = $((newPools: GetPasaranResponseI[]) => {
    if (newPools) {
      const formattedPools: ShownPoolsInterface[] = newPools.map(
        (pool: GetPasaranResponseI) => {
          const {
            pasaran_id,
            pasaran_name,
            pasaran_active,
            daily_closetime,
            recent_results,
          } = pool;
          const splittedDailyCloseTime = daily_closetime?.split(":");
          const now = new Date();
          const targetTime = new Date();
          targetTime.setHours(
            Number(splittedDailyCloseTime[0]),
            Number(splittedDailyCloseTime[1]),
            Number(splittedDailyCloseTime[2]),
            0,
          );
          if (now > targetTime) {
            targetTime.setDate(targetTime.getDate() + 1);
          }
          const timeDifference = targetTime.valueOf() - now.valueOf();
          const hours =
            `00${Math.floor((timeDifference / (1000 * 60 * 60)) % 24)}`.slice(
              -2,
            );
          const minutes =
            `00${Math.floor((timeDifference / 1000 / 60) % 60)}`.slice(-2);
          const seconds = `00${Math.floor((timeDifference / 1000) % 60)}`.slice(
            -2,
          );

          return {
            pasaran_id,
            pasaran_name,
            hours,
            minutes,
            seconds,
            pasaran_active,
            recent_results,
          };
        },
      );

      const firstArray = [];
      const secondArray = [];

      if (formattedPools.length === 2 || formattedPools.length === 4) {
        firstArray.push(...formattedPools);
      } else if (formattedPools.length < 9) {
        firstArray.push(...formattedPools.slice(0, 4));
        secondArray.push(...formattedPools.slice(4));
      } else if (formattedPools.length === 9) {
        firstArray.push(...formattedPools.slice(0, 5));
        secondArray.push(...formattedPools.slice(5));
      } else {
        const firstLength = Math.ceil(formattedPools.length / 2);
        const secondLength = formattedPools.length - firstLength;
        firstArray.push(...formattedPools.slice(0, firstLength));
        secondArray.push(
          ...formattedPools.slice(firstLength, firstLength + secondLength),
        );
      }

      return { firstPools: firstArray, secondPools: secondArray };
    }

    return { firstPools: [], secondPools: [] };
  });
  const getPasaran = useGetPasaran();

  useVisibleTask$(
    ({ cleanup }) => {
      if (isServer) {
        return;
      }

      const fetchAndCalculate = async () => {
        console.log("Data,,,,,,,,,", getPasaran.value);
        const pools = await calculateCountdown(getPasaran.value);
        firstPools.value = pools.firstPools;
        secondPools.value = pools.secondPools;
        // calculateCountdown(data);
        const interval = setInterval(() => {
          calculateCountdown(getPasaran.value);
          console.log("INTERVAL............");
        }, 1000);

        cleanup(() => clearInterval(interval));
      };

      fetchAndCalculate();

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
    // { eagerness: "visible" },
  );

  return (
    <div class="bg-habibi-lightGreen space-y-2 px-5 py-3 ">
      <div class="swiper carousel-swiper">
        <div class="swiper-wrapper">
          {[...firstPools.value].map((item, index) => (
            <div
              class={[
                "swiper-slide",
                index + 1 > firstPools.value.length && "lg:!hidden",
              ]}
              key={index + "first"}
            >
              <div class="bg-habibi-darkGray border-habibi-darkGray w-11/12 rounded-xl border border-solid">
                <p class="mb-3 w-full text-center text-neutral-200">
                  {item.pasaran_name}
                </p>
                <p class="mb-3 w-full text-center text-sm text-sky-500">
                  {item.recent_results[0].result}
                </p>
                <p class="mb-3 w-full text-center text-sm text-yellow-500">
                  {item.recent_results[0].draw_date}
                </p>
                <p class="mb-3  w-full text-center text-green-300">
                  {item.hours} :{item.minutes}: {item.seconds}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="swiper carousel-swiper">
        <div class="swiper-wrapper">
          {secondPools.value.map((item, index) => (
            <div
              class={[
                "swiper-slide",
                index + 1 > secondPools.value.length && "lg:!hidden",
              ]}
              key={index + "second"}
            >
              <div class="bg-habibi-darkGray border-habibi-darkGray w-11/12 rounded-xl border border-solid">
                <p class="mb-3 w-full text-center text-neutral-200">
                  {item.pasaran_name}
                </p>
                <p class="mb-3 w-full text-center text-sm text-sky-500">
                  {item.recent_results[0].result}
                </p>
                <p class="mb-3 w-full text-center text-sm text-yellow-500">
                  {item.recent_results[0].draw_date}
                </p>
                <p class="mb-3  w-full text-center text-green-300">
                  {item.hours} :{item.minutes}: {item.seconds}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
