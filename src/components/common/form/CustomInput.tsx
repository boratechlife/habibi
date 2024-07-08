import {
  type PropsOf,
  component$,
  type ClassList,
  PropFunction,
  useSignal,
} from "@builder.io/qwik";

type InputProps = PropsOf<"input"> & {
  label?: string;
  errorMsg?: string;
  errors?: string[];
  wrapperClasses?: ClassList;
  onInput?: PropFunction<(event: Event) => void>;
};

export default component$<InputProps>(
  ({ label, class: classes, onInput, errors, wrapperClasses, ...props }) => {
    const isView = useSignal(false);

    return (
      <div class={["input-field relative space-y-1", wrapperClasses]}>
        {label && (
          <label
            class={[
              "inline-block text-sm font-normal text-white",
              props.required &&
                "after:ml-[3px] after:text-red-500 after:content-['*']",
            ]}
            for={props.name}
          >
            {label}
          </label>
        )}

        <input
          {...props}
          onInput$={onInput}
          type={props.name == "password" && !isView.value ? "password" : "text"}
          class={[classes, "text-base"]}
        />
        {props.name == "password" && (
          <div
            class="absolute bottom-2 right-0 rounded bg-slate-500 text-white"
            onClick$={() => {
              isView.value = !isView.value;
            }}
          >
            {isView.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M5.25 10.055V8a6.75 6.75 0 0 1 13.5 0v2.055c1.115.083 1.84.293 2.371.824C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16c0-2.828 0-4.243.879-5.121c.53-.531 1.256-.741 2.371-.824M6.75 8a5.25 5.25 0 0 1 10.5 0v2.004C16.867 10 16.451 10 16 10H8c-.452 0-.867 0-1.25.004zM8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                  clip-rule="evenodd"
                />
              </svg>
            )}
            {!isView.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M6.75 8a5.25 5.25 0 0 1 10.335-1.313a.75.75 0 0 0 1.452-.374A6.75 6.75 0 0 0 5.25 8v2.055c-1.115.083-1.84.293-2.371.824C2 11.757 2 13.172 2 16c0 2.828 0 4.243.879 5.121C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.243 22 18.828 22 16c0-2.828 0-4.243-.879-5.121C20.243 10 18.828 10 16 10H8c-.452 0-.867 0-1.25.004zM8 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                  clip-rule="evenodd"
                />
              </svg>
            )}
          </div>
        )}

        {errors &&
          errors.map((error, index) => (
            <div key={error + index} class="text-sm text-red-500">
              {error}
            </div>
          ))}
      </div>
    );
  },
);
