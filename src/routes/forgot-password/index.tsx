import { component$, $, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { z } from "zod";
import { ForgotPasswordRequestI } from "~/data/auth";

// Define the Zod schema
const formSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  eMail: z.string().email("Invalid email address"),
});

export default component$(() => {
  const state = useStore({
    userName: "",
    eMail: "",
    errors: {} as Record<string, string>,
  });

  const handleSubmit$ = $(async (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      userName: formData.get("userName"),
      eMail: formData.get("eMail"),
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      // Handle validation errors
      const errors = result.error.format();
      state.errors = {
        userName: errors.userName?._errors[0] || "",
        eMail: errors.eMail?._errors[0] || "",
      };

      console.log("Errors", state.errors);
    } else {
      // Handle successful form submission
      console.log(result.data); // Replace with your logic (e.g., send to server)

      try {
        const res = await fetch("/api/gemini/reset-password", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            hostName: window.location.hostname,
          }),
        });
        // Clear form state
        state.userName = "";
        state.eMail = "";
        state.errors = {};
        alert("Password reset request submitted!");
      } catch (error) {
        alert("error occured");
      }
    }
  });

  return (
    <>
      <section>
        <div class="mt-20 h-full">
          <div class="px-5 text-white">
            <div class="border-b-2 border-solid border-white text-center">
              <p class="pb-2 text-lg capitalize">Lupa Password</p>
            </div>
            <form onSubmit$={handleSubmit$} preventdefault:submit>
              <div class="flex w-full pb-2 pt-5">
                <div class="my-auto flex h-full w-1/3">
                  Username<div class="grow"></div>:
                </div>
                <div class="relative w-2/3 px-2">
                  <input
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                    name="userName"
                    value={state.userName}
                    onInput$={(e) =>
                      (state.userName = (e.target as HTMLInputElement).value)
                    }
                  />
                  {state.errors.userName && (
                    <div class="absolute top-full pt-1 text-sm text-red-500">
                      {state.errors.userName}
                    </div>
                  )}
                </div>
              </div>
              <div class="py-3 text-right text-red-500"></div>
              <div class="flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Email<div class="grow"></div>:
                </div>
                <div class="relative w-2/3 px-2">
                  <input
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                    name="eMail"
                    value={state.eMail}
                    onInput$={(e) =>
                      (state.eMail = (e.target as HTMLInputElement).value)
                    }
                  />
                  {state.errors.eMail && (
                    <div class="absolute top-full pt-1 text-sm text-red-500">
                      {state.errors.eMail}
                    </div>
                  )}
                </div>
              </div>
              <div class="py-3 text-right text-red-500"></div>
              <button class="mb-2.5 block h-11 w-full min-w-fit rounded-xl border-0 bg-sky-500 px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
