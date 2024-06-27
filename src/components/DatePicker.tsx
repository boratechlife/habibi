// src/components/DatePicker.tsx
import { PropFunction, PropsOf, component$ } from "@builder.io/qwik";

type InputProps = PropsOf<"input"> & {
  errorMsg?: string;
  errors?: string[];
  name: string;
  onInput?: PropFunction<(event: Event) => void>;
};

export const DatePicker = component$<InputProps>(({ onInput, name }) => {
  return (
    <div>
      <div class="relative max-w-sm">
        <div class="pointer-events-none absolute inset-y-0 right-3  flex items-center ps-3.5">
          <svg
            class="h-4 w-4 text-white dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="date"
          onChange$={onInput}
          name={name}
          class="block w-full rounded-lg border border-[#808080] bg-transparent p-2.5 ps-2 text-sm text-white  placeholder:text-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Select date"
        />
      </div>
    </div>
  );
});
