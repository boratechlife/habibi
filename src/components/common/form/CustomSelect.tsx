import {
  type ClassList,
  type PropsOf,
  component$,
  useComputed$,
  PropFunction,
} from "@builder.io/qwik";

type SelectProps = PropsOf<"select"> & {
  label?: string;
  errorMsg?: string;
  errors?: string[];
  wrapperClasses?: ClassList;
  options: { label: string; value: string }[] | string[];
  placeholderOption?: string;
  onInput?: PropFunction<(event: Event) => void>;
};

export default component$<SelectProps>(
  ({
    label,
    wrapperClasses,
    class: classes,
    options,
    placeholderOption,
    onInput,
    errors,
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
        <select {...props} class={[classes]} onChange$={onInput}>
          {resolvedOptions.value.map((opt, index) => (
            <option value={opt.value} key={index}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors &&
          errors.map((error, index) => (
            <div key={"error" + index} class="text-sm text-red-500">
              {error}
            </div>
          ))}
      </div>
    );
  },
);
