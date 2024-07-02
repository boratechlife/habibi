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
