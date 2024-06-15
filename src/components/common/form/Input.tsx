import { type PropsOf, component$, type ClassList } from "@builder.io/qwik";

type InputProps = PropsOf<"input"> & {
  label?: string;
  errorMsg?: string;
  wrapperClasses?: ClassList;
};

export default component$<InputProps>(
  ({ label, errorMsg, class: classes, wrapperClasses, ...props }) => {
    return (
      <div class={["input-field space-y-1", wrapperClasses]}>
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
          class={[
            "block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-xs lowercase leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-[#66afe9] focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none",
            classes,
          ]}
        />

        {errorMsg && <span class="text-xs text-red-500">{errorMsg}</span>}
      </div>
    );
  },
);
