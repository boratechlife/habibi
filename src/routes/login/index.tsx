import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import {
  DocumentHead,
  routeAction$,
  useNavigate,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { LoaderPage } from "~/components/LoaderPage";
import BaseLayout from "~/components/common/BaseLayout";
import Input from "~/components/common/form/Input";
import { AuthContext } from "~/context/auth-context";
import { fetchLogin } from "~/utils/Main";
import { useProductDetails } from "../layout";

export const useLoginSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

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
  const formData = useStore<any>({
    username: "",
    password: "",
  });
  const formSubmitting = useSignal(false);
  const authContext = useContext(AuthContext);

  interface ValidationErrors {
    formErrors: string[];
    fieldErrors: {
      [field: string]: string[];
    };
  }

  const fieldErrors = useStore<ValidationErrors>({
    formErrors: [],
    fieldErrors: {},
  });
  const resetErrors = $(() => {
    fieldErrors.fieldErrors = {};
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    const name: string = target.name;
    const value: string = target.value;
    if (target.name === "username") {
      formData[name] = value.toLowerCase().trim();
    } else {
      formData[name] = value;
    }

    resetErrors();

    console.log("name", name, target.name, formData[name]);
  });
  const nav = useNavigate();
  // const action = useLoginUser();
  const error = useSignal<any>();

  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    console.log("form Data", formData);
    formSubmitting.value = true;
    const result = await useLoginSchema.safeParseAsync(formData);

    if (!result.success) {
      fieldErrors.fieldErrors = result.error.formErrors.fieldErrors;
      console.log("ERRORS", fieldErrors.fieldErrors);
      return;
    }

    async function getUserIpAddress() {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
      // return "127.0.0.1";
    }

    const userIpAddress = await getUserIpAddress();

    const loginResult = await fetchLogin(formData, userIpAddress);

    const res = loginResult.values;
    console.log("LOGN RESULT", res);

    if (!res.Result) {
      console.log("Result", res);
      error.value = res.err;
      alert("error");
      formSubmitting.value = false;
      return;
    }

    if (res.agentName !== import.meta.env.PUBLIC_MAIN_PARENT) {
      console.warn(
        "User tidak boleh akses situs ini! atau user tidak di temukan",
      );
      alert("Username/Password salah");
      formSubmitting.value = false;
      return;
    }

    if (res.err == 500) {
      console.log("res.loginBody.err_message", res.err_message);
      error.value = res.err_message;
      formSubmitting.value = false;
    }

    if (res.token && res.token.length > 0) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          time: new Date(),
          username: formData.username,
          ...res,
        }),
      );
      authContext.user = res;
      setTimeout(() => {
        formSubmitting.value = false;
      }, 3000);
      await nav("/lobby");
    }

    // console.log("RESPONSE", res);
  });

  const handleKeyDown = $((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  });

  return (
    <BaseLayout autoLogoSize>
      {formSubmitting.value && <LoaderPage />}
      <div class="bg-habibi-darkGray h-fit px-2 pt-2">
        {error.value && error.value.length > 0 && (
          <div class="text-red-500">{error.value}</div>
        )}
        <div class="space-y-2">
          <div>
            <Input
              label="Nama Pengguna"
              name="username"
              type="text"
              placeholder="Nama Pengguna Anda"
              class="!lowercase"
              errors={
                fieldErrors.fieldErrors && fieldErrors.fieldErrors.username
              }
              onInput={$((e) => handleInputChange(e as any))}
              required
            />
          </div>

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            errors={fieldErrors.fieldErrors && fieldErrors.fieldErrors.username}
            onInput={$((e) => handleInputChange(e as any))}
            onKeyDown={handleKeyDown}
            class="text-black"
            required
          />

          <div>
            <button
              type="submit"
              onClick$={handleSubmit}
              disabled={formSubmitting.value}
              class="a button-login mb-2.5 block h-11 w-full rounded-full  border-0 px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-black"
            >
              Masuk
            </button>

            <a
              href="/forgot-password"
              class="custom-href block  h-11 w-full  rounded-full border-0 bg-red-600 px-5 pb-6 pt-2.5 text-center text-lg font-extrabold uppercase leading-5 tracking-wide text-white"
            >
              Lupa Password
            </a>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const site: any = resolveValue(useProductDetails);
  return {
    title: site.siteInfo.SEO.login.title,
    meta: [
      {
        name: "description",
        content: site.siteInfo.SEO.login.description,
      },
    ],
  };
};
