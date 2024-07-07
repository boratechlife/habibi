import {
  type PropsOf,
  component$,
  type ClassList,
  type PropFunction,
  useSignal,
  type QRL,
} from "@builder.io/qwik";

type InputProps = PropsOf<"input"> & {
  label?: string;
  errorMsg?: string;
  errors?: string[];
  wrapperClasses?: ClassList;
  onInput?: PropFunction<(event: Event) => void>;
  onKeyDown?: QRL<(event: KeyboardEvent) => void>;
};

export default component$<InputProps>(
  ({
    label,
    class: classes,
    onInput,
    onKeyDown,
    errors,
    wrapperClasses,
    ...props
  }) => {
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
          onKeyDown$={onKeyDown}
          type={props.name == "password" && !isView.value ? "password" : "text"}
          class={[
            "block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base  normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-[#66afe9] focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none",
            classes,
          ]}
        />
        {props.name == "password" && (
          <div
            class="absolute bottom-2 right-0 rounded bg-slate-500 text-white"
            onClick$={() => {
              isView.value = !isView.value;
            }}
          >
            view
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
