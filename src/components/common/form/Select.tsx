import {
  type ClassList,
  type PropsOf,
  component$,
  useComputed$,
} from "@builder.io/qwik";

type SelectProps = PropsOf<"select"> & {
  label?: string;
  errorMsg?: string;
  wrapperClasses?: ClassList;
  options: { label: string; value: string }[] | string[];
  placeholderOption?: string;
};

export default component$<SelectProps>(
  ({
    label,
    errorMsg,
    wrapperClasses,
    class: classes,
    options,
    placeholderOption,
    ...props
  }) => {
    const resolvedOptions = useComputed$(() => {
      return [
        ...(placeholderOption ? [{ label: placeholderOption, value: "" }] : []),
        ...options.map((opt) => {
          if (typeof opt === "string") {
            return { label: opt, value: opt };
          }
          return opt;
        }),
      ];
    });

    return (
      <div class={["select-field space-y-1", wrapperClasses]}>
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
        <select
          {...props}
          class={[
            "block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-xs uppercase leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-[#66afe9] focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none",
            classes,
          ]}
        >
          {resolvedOptions.value.map((opt, index) => (
            <option value={opt.value} key={index}>
              {opt.label}
            </option>
          ))}
        </select>
        {errorMsg && <span class="text-xs text-red-500">{errorMsg}</span>}
      </div>
    );
  },
);
