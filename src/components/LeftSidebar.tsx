// src/components/DatePicker.tsx
import { $, component$, useStore } from "@builder.io/qwik";

export const LeftSidebar = component$(() => {
  const state = useStore({ isOpen: false });

  const toggleDropdown = $(() => {
    state.isOpen = !state.isOpen;
  });

  return (
    <div class="relative min-w-[10rem]">
      <button
        id="dropdownDividerButton"
        onClick$={toggleDropdown}
        class="custom-bg-gradient  inline-flex w-max items-center justify-between rounded-lg bg-blue-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Pilih Kategori{" "}
        <svg
          class="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDivider"
        class={`z-10 ${state.isOpen ? "" : "hidden"} absolute top-full w-full min-w-[14rem] divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
      >
        <div
          class="dropdown-menu   block rounded border border-solid border-[rgba(0,0,0,0.15)]
        bg-white"
        >
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            pragmatic
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            pgsoft
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            undefined
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            nolimit city
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            fachai gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            yggdrasil
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            winfast
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            fastspin
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            avatarux
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            cq9 casino
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            quickspin
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            habanero
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            dragoon soft
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            jdb
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            booongo
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            spadegaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            iron dog studio
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            hacksaw gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            netent
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            relax gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            onetouch
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            undefined
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            blueprint gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            wazdan
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            woohoo games
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            1x2 gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            thunderkick
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            nextspin
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            evoplay
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            print studios
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            push gaming
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            mobilots
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            gameart
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            slotmill
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            fugaso
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            undefined
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            play'n go
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            mannaplay
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            undefined
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            jili
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-600 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            undefined
          </div>
          <div
            class="z-50 clear-both block w-full border-0  bg-gray-500 px-6 py-1 text-lg font-semibold uppercase text-white
              hover:underline
              "
          >
            kingmaker
          </div>
        </div>
      </div>
    </div>
  );
});
