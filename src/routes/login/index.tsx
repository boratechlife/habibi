import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import BaseLayout from "~/components/common/BaseLayout";

export const useLoginUser = routeAction$(
  async (data, { redirect }) => {
    console.log(data);
    throw redirect(301, "/lobby");
    return { success: true };
  },
  zod$({
    username: z.string().min(5) /** Must be atleast 5 characters in length */,
    password: z.string().min(8) /** Must be atleast 8 characters in length */,
  }),
);

export default component$(() => {
  const action = useLoginUser();
  return (
    <BaseLayout autoLogoSize>
      <div class="bg-[linear-gradient(#217cb1_0,#003f64_100%)] pt-2">
        <Form action={action} class="space-y-2">
          <div>
            <input
              name="username"
              class="block h-12 w-full rounded-full border-4 border-solid border-sky-500 bg-white px-3 text-center tracking-normal text-sky-700 placeholder:text-sky-500 focus:border-4 focus:border-sky-600"
              type="text"
              placeholder="Username"
              required
              minLength={5}
            />
          </div>

          <PasswordInput />

          <div>
            <button
              type="submit"
              class="mb-2.5 block h-11  w-full rounded-full border-0 bg-[linear-gradient(180deg,#ddf3ff_0,#1cadff_50%,#0073b3)] px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white shadow-[inset_0_0_0_0_#000,_inset_-1px_-3px_0_0_#4dbeff,_inset_0_2px_4px_2px_#5ac4ff,_0_0_0_0_rgba(0,_0,_0,_.2)]"
            >
              Masuk
            </button>

            <a
              href="/forgot-password"
              class=" block  h-11 w-full  rounded-full border-0 bg-red-600 px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white"
            >
              Lupa Password
            </a>
          </div>
        </Form>
      </div>
    </BaseLayout>
  );
});

const PasswordInput = component$(() => {
  const isRevealed = useSignal(false);

  return (
    <div class="relative">
      <input
        type="password"
        name="password"
        class=" block h-12 w-full rounded-full border-4 border-solid border-sky-500 bg-white px-3 text-center tracking-normal text-sky-700 placeholder:text-sky-500 focus:border-4 focus:border-sky-600"
        placeholder="Kata sandi"
        required
        minLength={8}
      />

      <button
        type="button"
        class="absolute right-2.5 top-3"
        onClick$={(ev) => {
          const input = (ev.target as HTMLButtonElement)
            .previousElementSibling as HTMLInputElement | null;

          if (input) {
            const isPass = input.type === "password";

            isRevealed.value = !isPass;

            input.type = isPass ? "text" : "password";
          }
        }}
      >
        {isRevealed.value ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="pointer-events-none h-6 w-6   text-neutral-600"
          >
            <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"></path>
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"></path>
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="pointer-events-none h-6 w-6 cursor-pointer text-neutral-600"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
});
