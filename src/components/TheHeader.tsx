// src/components/DatePicker.tsx
import { $, component$, useStore } from "@builder.io/qwik";
import { Sidebar } from "./Sidebar";
import logoGif from "~/media/logo/BIMA-TOTO.webp";

export const TheHeader = component$(() => {
  const state = useStore({ isOpen: false });

  const toggleDropdown = $(() => {
    state.isOpen = !state.isOpen;
  });

  return (
    <header class="has-background null fixed left-0 right-0 top-0 z-10 w-full  backdrop-blur-sm transition-all duration-300 ease-out lg:mx-auto lg:backdrop-blur-none">
      <div class="relative flex border-b-2 border-solid bg-bimatoto-darkPurple bg-bimatoto-darkPurple/80">
        <div class="flex w-full items-center justify-between rounded-3xl p-2">
          <button
            type="button"
            class="-m-2.5 p-2.5 text-amber-500 "
            onClick$={toggleDropdown}
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>
          </button>
          {state.isOpen && <Sidebar onClick={toggleDropdown} />}
          <div class="bg-gel-black/50 absolute inset-0 -z-10 rounded-3xl opacity-100 transition-opacity duration-500"></div>
          <a href="/lobby">
            <img
              src={logoGif}
              alt="Discover"
              class="h-14"
              width={250}
              height={87.08}
            />
          </a>
          <button class="buttonlc2 ml-1 inline-block h-[35px] min-w-[25%] rounded-xl border-4 border-solid border-yellow-600 bg-yellow-600 bg-[linear-gradient(#4a4a4a_0,#484848_50%,#000_95%)] px-0 pb-6 pt-2.5 text-center text-sm uppercase leading-[14px] text-white active:bg-amber-700">
            <a href="/deposit">Deposit</a>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class="h-8 rounded-lg bg-blue-500 p-1 text-white"
            >
              <path
                fill-rule="evenodd"
                d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
});
