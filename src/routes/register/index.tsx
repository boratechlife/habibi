/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable qwik/no-use-visible-task */
import cryptojs from "crypto-js";
import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  routeAction$,
  zod$,
  z,
  Form,
  useNavigate,
  DocumentHead,
} from "@builder.io/qwik-city";
import { fetchCheckAccountNo, fetchCheckPhone, fetchLogin } from "~/utils/Main";
import { queryBankAccountNo, queryPhone, queryUserName } from "./yoda";
// import { useLoginSchema } from "../login";
import { AuthContext } from "~/context/auth-context";
import BaseLayout from "~/components/common/BaseLayout";
import { LoaderPage } from "~/components/LoaderPage";
import { useProductDetails } from "../layout";

const formSchema = z.object({
  userName: z
    .string({ required_error: "Username di perlukan" })
    .min(1, { message: "Username di perlukan" }) // This ensures the field is not empty
    .min(6, { message: "username minimum 6 karakter" })
    .max(15, { message: "username tidak boleh lebih dari 15 karakter" })
    .regex(/^[a-z0-9]+$/, {
      message: "username harus terdiri dari huruf kecil dan angka saja",
    })
    .refine(
      async (value) => {
        if (value.length > 6) {
          const userNameExist = await queryUserName(value);
          return !userNameExist;
        }
        return true;
      },
      { message: "Username is already taken" },
    ),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      "Kata sandi harus mengandung setidaknya satu huruf, satu angka, dan memiliki panjang minimal 8 karakter.",
  }),
  eMail: z
    .string()
    .min(1, { message: "Harap masukan email anda!" })
    .email({ message: "Format email adalah xxx@yyy.com" }),
  telephone: z
    .string()
    .min(1, { message: "harap masukan nomor telpon anda!" })
    .max(13, { message: "Nomor telepon maksimal 13 karakter" })
    .regex(/^\d+$/, { message: "telephone harus angka" })
    .refine(
      async (value) => {
        const phoneExist = await queryPhone(value);
        return !phoneExist;
      },
      { message: "Nomor telephone sudah terdaftar" },
    ),

  bank: z.enum(
    [
      "BCA",
      "BLU",
      "MANDIRI",
      "BNI",
      "BRI",
      "BSI",
      "CIMB",
      "DANAMON",
      "JAGO",
      "PERMATA",
      "PANIN",
      "DANA",
      "OVO",
      "GOPAY",
      "LINK-AJA",
    ],
    { errorMap: () => ({ message: "Pilih Bank anda!" }) },
  ),
  bankName: z.string().min(1, { message: "Harap masukan nama lengkap anda!" }),
  bankAccount: z
    .string()
    .min(1, { message: "harap masukan nomor rekening anda" })
    .max(18, { message: "Lebih dari 18 digit, hubungi ADMIN" })
    .regex(/^\d+$/, { message: "nomor rekening harus angka" })
    .refine(
      async (value) => {
        const accountNoExist = await queryBankAccountNo(value);
        return !accountNoExist;
      },
      { message: "Nomor rekening sudah terdaftar" },
    ),
  referral: z.string().optional(),
  agentName: z.string(),
  currency: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  status: z.string(),
});

export const useRegisterSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
  email: z.string().email(),
  telephone: z
    .string()
    .min(10, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .max(13, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .regex(/^[0-9]{10,13}$/, "Nomor Kontak Harus diantara 10 dan 13 digit")
    .refine(
      async (value) => {
        console.log("value", value);
        if (value.length < 0) {
          return false;
        }

        const phoneNo = `+62${value.substring(1)}`;
        const result = await fetchCheckPhone(phoneNo);

        if (!result.success) {
          console.error("Error", result.error);
          return;
        }

        const responseBody = result.data;
        return !responseBody.exists;
      },
      {
        message: "Nomor telpon tidak bisa di gunakan! sudah terdaftar",
      },
    ),
  bank: z.string().min(1, "Bank is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccount: z
    .string()
    .min(10, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .max(18, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .regex(/^[0-9]{10,18}$/, {
      message: "Nomor rekening harus diisi dan harus diantara 10 dan 18 digit",
    })
    .refine(
      async (value) => {
        if (value.length >= 10 && value.length <= 18) {
          const result = await fetchCheckAccountNo(value);

          if (!result.success) {
            console.error("Error", result.error);
            return false;
          }

          const responseBody = result.data;
          console.log("Account number check response", responseBody);
          return !responseBody.exist;
        }
        return true;
      },
      {
        message: "Nomor rekening tidak bisa di gunakan! sudah terdaftar",
      },
    ),
  referralCode: z.string(),
});

// Infer the type
export type LoginForm = z.infer<typeof formSchema>;

// Use the inferred type in routeLoader$
// export const useFormLoader = routeLoader$<LoginForm>(() => ({
//   userName: "",
//   password: "",
//   eMail: "",
//   telephone: "",
//   bank:'',
//   bankName: "",
//   bankAccount: "",
//   referralCode: "",
// }));

// Refactor to use routeAction$
export const useRegister = routeAction$(async (data) => {
  console.info("what is data", JSON.stringify(data, null, 2));
  const hash = cryptojs
    .MD5(`${data.userName}${data.password}${data.agentName}REGIS`)
    .toString();

  const registerCb = await fetch(
    import.meta.env.PUBLIC_BACKEND_URL + "user/v2/insert",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sig": hash,
      },
      body: JSON.stringify(data),
    },
  )
    .then(async (res) => {
      try {
        return await res.json();
      } catch (err) {
        return await res.text();
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      return { error: "An error occurred during the request" };
    });

  console.log("what is registerCb", registerCb);
  return {
    success: true,
    data: registerCb.err_message,
  };
}, zod$(formSchema));

const App = component$(() => {
  const action = useRegister();
  const nav = useNavigate();
  const loggingIn = useSignal(false);
  const authContext = useContext(AuthContext);
  const register_state = useStore({
    openLoginModal: false,
    formData: {
      // userName: "xperia" + Math.floor(Math.random() * 1000),
      // password: "Abcd8899",
      // referral: "",
      // eMail: "test@test.com",
      // telephone: "0811947761",
      // bank: "BCA",
      // bankName: "Testing",
      // bankAccount: "0811947762",
      userName: "",
      password: "",
      referral: "",
      eMail: "",
      telephone: "",
      bank: "-",
      bankName: "",
      bankAccount: "",
    },
    errors: {
      userName: "",
      password: "",
      eMail: "",
      telephone: "",
      bank: "",
      bankName: "",
      bankAccount: "",
      referral: "",
    },
  });

  type FormFields = keyof typeof formSchema.shape;

  const validateField = $(async (field: FormFields, value: string) => {
    const schema = formSchema.shape[field];

    if (!schema) {
      return;
    }

    if (value === "") {
      // Clear the error if the field is empty
      register_state.errors = { ...register_state.errors, [field]: "" };
      if (action.value?.fieldErrors) {
        action.value.fieldErrors[field] = "" || [];
      }
      return;
    }

    const result = await schema.safeParseAsync(value);

    if (result.success) {
      // Clear the error if the field meets the criteria
      register_state.errors = { ...register_state.errors, [field]: "" };
    } else {
      // Set the error message if validation fails
      register_state.errors = {
        ...register_state.errors,
        [field]: result.error.errors[0].message,
      };
    }
  });

  const handleInputChange = $((field: FormFields, event: Event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    if (
      action.value?.fieldErrors &&
      action.value.fieldErrors[target.name as FormFields]
    ) {
      action.value.fieldErrors[target.name as FormFields] = [];
    }

    if (target.name === "userName") {
      value = target.value.toLowerCase().trim();
    }
    console.log("Value", value);

    register_state.formData = { ...register_state.formData, [field]: value };
    validateField(field, value);
  });

  const handleLogin = $(async () => {
    // console.log("form Data", register_state.formData);

    // const result = await useLoginSchema.safeParseAsync({
    //   username: register_state.formData.userName,
    //   password: register_state.formData.userName,
    // });

    // if (!result.success) {
    //   alert("Error logging in");
    //   return;
    // }
    loggingIn.value = true;
    async function getUserIpAddress() {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
      // return "127.0.0.1";
    }

    const userIpAddress = await getUserIpAddress();

    const loginResult = await fetchLogin(
      {
        // username: register_state.formData.userName,
        // password: register_state.formData.userName,
        username: register_state.formData.userName.toLowerCase().trim(),
        password: register_state.formData.password,
      },
      userIpAddress,
    );

    const res = loginResult.values;
    console.info("LOGN RESULT", res);

    if (!res.Result) {
      console.log("Result", res);
      alert("error Login in");
      loggingIn.value = false;
      return;
    }

    if (res.err == 500) {
      console.log("res.loginBody.err_message", res.err_message);
      loggingIn.value = false;
      alert(res.err_message);
    }

    if (res.token && res.token.length > 0) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          time: new Date(),
          username: register_state.formData.userName,
          ...res,
        }),
      );
      authContext.user = res;
      setTimeout(async () => {
        loggingIn.value = false;
      }, 5000);
      await nav("/lobby");
    }

    console.log("RESPONSE", res);
  });

  useVisibleTask$(async ({ track }) => {
    track(() => action.value);
    const referral: string = localStorage.getItem("referral") || "";
    if (referral) {
      register_state.formData.referral = referral || "";
    }

    if (action.value && action.value.success) {
      register_state.openLoginModal = true;

      console.log("LOGIN TO BE ACTIVATED");
    }
  });

  if (action.value) {
    console.log("ACTION", action.value);
    if (action.value.failed) {
      // action failed if query string has no secret
      // action.value satisfies { failed: true; message: string };
    } else {
      // action.value satisfies { searchResult: string };
      handleLogin();
    }
  }

  return (
    <BaseLayout autoLogoSize>
      {action.isRunning && <LoaderPage />}
      {loggingIn.value && <LoaderPage />}

      <Form action={action} class="bg-indie-darkGray  mx-auto space-y-6 pt-2">
        <div class="bg-indie-darkGray  pt-2">
          <div class="space-y-3">
            <div>
              <div class="bg-indie-black mb-[15px] py-2.5 text-center text-lg text-white">
                Informasi Pribadi
              </div>
              <div class="space-y-1 px-10">
                <div>
                  <label class="block text-white">Nama Pengguna *</label>
                  <input
                    name="userName"
                    type="text"
                    onInput$={$((event: Event) =>
                      handleInputChange("userName", event),
                    )}
                    placeholder="Nama Pengguna Anda"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base lowercase leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />

                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.userName)
                      ? action.value?.fieldErrors?.userName.join(", ")
                      : action.value?.fieldErrors?.userName ||
                        register_state.errors.userName}
                  </p>
                </div>

                <div>
                  <label class="block text-white">Kata Sandi *</label>
                  <input
                    name="password"
                    type="password"
                    onInput$={$((event: Event) =>
                      handleInputChange("password", event),
                    )}
                    placeholder="Kata Sandi Anda"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />
                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.password)
                      ? action.value?.fieldErrors?.password.join(", ")
                      : action.value?.fieldErrors?.password ||
                        register_state.errors.password}
                  </p>
                </div>
                <div>
                  <label class="block text-white">Email *</label>
                  <input
                    name="eMail"
                    type="email"
                    placeholder="email@example.com"
                    onInput$={$((event: Event) =>
                      handleInputChange("eMail", event),
                    )}
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />
                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.eMail)
                      ? action.value?.fieldErrors?.eMail.join(", ")
                      : action.value?.fieldErrors?.eMail ||
                        register_state.errors.eMail}
                  </p>
                </div>
                <div>
                  <label class="block text-white">No. Telepon *</label>
                  <input
                    name="telephone"
                    type="text"
                    onInput$={$((event: Event) =>
                      handleInputChange("telephone", event),
                    )}
                    placeholder="Nomor Telefon Anda"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />

                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.telephone)
                      ? action.value?.fieldErrors?.telephone.join(", ")
                      : action.value?.fieldErrors?.telephone ||
                        register_state.errors.telephone}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div class="bg-indie-black mb-[15px] mt-10 py-2.5 text-center text-lg text-white">
                Informasi Pembayaran
              </div>
              <div class="space-y-1 px-10">
                <div>
                  <label class="block text-white">Bank *</label>
                  <select
                    name="bank"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                    onChange$={$((event: Event) =>
                      handleInputChange("bank", event),
                    )}
                  >
                    <option value="" disabled>
                      -- Pilih Bank --
                    </option>
                    <option value="BCA">BCA</option>
                    <option value="BLU">BLU</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="BSI">BSI</option>
                    <option value="CIMB">CIMB</option>
                    <option value="DANA">DANA</option>
                    <option value="DANAMON">DANAMON</option>
                    <option value="JAGO">JAGO</option>
                    <option value="MANDIRI">MANDIRI</option>
                    <option value="PERMATA">PERMATA</option>
                    <option value="OVO">OVO</option>
                  </select>

                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.bank)
                      ? action.value?.fieldErrors?.bank.join(", ")
                      : action.value?.fieldErrors?.bank ||
                        register_state.errors.bank}
                  </p>
                </div>
                <div>
                  <label class="block text-white">Nama Lengkap *</label>
                  <input
                    name="bankName"
                    type="text"
                    onInput$={$((event: Event) =>
                      handleInputChange("bankName", event),
                    )}
                    placeholder="Nama lengkap anda sesuai dengan buku tabungan"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />
                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.bankName)
                      ? action.value?.fieldErrors?.bankName.join(", ")
                      : action.value?.fieldErrors?.bankName ||
                        register_state.errors.bankName}
                  </p>
                </div>
                <div>
                  <label class="block text-white">No. Rekening *</label>
                  <input
                    name="bankAccount"
                    type="text"
                    onInput$={$((event: Event) =>
                      handleInputChange("bankAccount", event),
                    )}
                    placeholder="Nomor rekening anda"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />

                  <p class="text-red-500">
                    {Array.isArray(action.value?.fieldErrors?.bankAccount)
                      ? action.value?.fieldErrors?.bankAccount.join(", ")
                      : action.value?.fieldErrors?.bankAccount ||
                        register_state.errors.bankAccount}
                  </p>
                </div>
                <input
                  type="hidden"
                  name="agentName"
                  value={import.meta.env.PUBLIC_MAIN_PARENT}
                />
                <input
                  type="hidden"
                  name="currency"
                  value={import.meta.env.PUBLIC_REGISTER_CURRENCY}
                />
                <input type="hidden" name="firstName" value="-" />
                <input type="hidden" name="lastName" value="-" />
                <input
                  type="hidden"
                  name="status"
                  value={import.meta.env.PUBLIC_REGISTER_STATUS}
                />
                <input
                  type="hidden"
                  name="tableLimit"
                  value={import.meta.env.PUBLIC_REGISTER_TABLE_LIMIT}
                />

                <div>
                  <label class="block text-white">Referral</label>
                  <input
                    name="referralCode"
                    type="text"
                    onInput$={$((event: Event) =>
                      handleInputChange("referral", event),
                    )}
                    placeholder="Kode Referensi"
                    class="block h-9 w-full rounded-none border border-solid border-neutral-900 bg-neutral-900 px-3 py-1.5 text-left align-middle text-base normal-case leading-[1.42857] text-neutral-500 shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset] placeholder:capitalize placeholder:text-neutral-400 focus:border-bimatoto-purple focus:shadow-[rgba(0,0,0,0.075)_0_1px_1px_inset,rgba(102,175,233,0.6)_0_0_8px] focus:outline-none"
                  />
                  {Array.isArray(action.value?.fieldErrors?.referral)
                    ? action.value?.fieldErrors?.referral.join(", ")
                    : action.value?.fieldErrors?.referral ||
                      register_state.errors.referral}
                </div>
              </div>
            </div>
            <div class="px-10">
              <button
                disabled={action.isRunning || loggingIn.value}
                type="submit"
                class="button-login w-full rounded-3xl  border-0 p-3 uppercase text-white"
              >
                Daftar
              </button>
              <div class="mb-5 mt-5 text-center text-xs text-gray-500">
                <p>
                  Dengan meng-klik tombol DAFTAR, saya menyatakan bahwa saya
                  berumur diatas 18 tahun dan telah membaca dan menyetujui
                  syarat &amp; ketentuan.
                </p>
              </div>
              <div class="pb-5 text-center text-xs">
                <a class="uppercase text-white hover:bg-[#ffb31b]" href="#">
                  syarat &amp; ketentuan
                </a>
              </div>
            </div>
          </div>
        </div>
      </Form>

      {action.value?.success && (
        <p class="text-red-500">
          Registration successful. Redirecting to login...
        </p>
      )}
    </BaseLayout>
  );
});

export default App;

export const head: DocumentHead = ({ resolveValue }) => {
  const site: any = resolveValue(useProductDetails);

  return {
    title: site.siteInfo.SEO.register.title,
    meta: [
      {
        name: "description",
        content: site.siteInfo.SEO.register.description,
      },
    ],
  };
};
