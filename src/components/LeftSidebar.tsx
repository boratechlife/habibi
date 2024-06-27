// src/components/DatePicker.tsx
import { $, PropFunction, component$, useStore } from "@builder.io/qwik";

interface Provider {
  provider: string;
  providerIdx: number;
  imgsrc: string;
}

interface LeftSidebarProps {
  providers: Provider[];
  onProviderSelect$: PropFunction<(provider: string) => void>;
}
export const LeftSidebar = component$<LeftSidebarProps>(
  ({ providers, onProviderSelect$ }) => {
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
            {providers.map((provider, index) => (
              <div
                key={provider.providerIdx + "" + index}
                onClick$={() => onProviderSelect$(provider.provider)}
                class={`z-50 clear-both block w-full border-0 ${
                  index % 2 ? "bg-gray-500" : "bg-gray-600"
                } cursor-pointer px-6 py-1 text-lg font-semibold uppercase text-white hover:underline`}
              >
                {provider.provider.toLowerCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
