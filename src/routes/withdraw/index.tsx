import {
  $,
  component$,
  // useOnDocument,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, z, type DocumentHead } from "@builder.io/qwik-city";

import CustomInput from "~/components/common/form/CustomInput";
import { LoaderPage } from "~/components/LoaderPage";

import { type BankI } from "~/data/auth";
import { fetchBalance, fetchBankInfo, fetchWithdraw } from "~/utils/Main";

export default component$(() => {
  const formData = useStore<any>({
    amount: 0,
    minWithdraw: 0,
    availableCredt: 0,
    payWithPg: true,
    // minWithdraw: operator?.min.va.Withdraw,
    // availableCredt: auth.creds?.AvailableCredit || 0,
    // payWithPg: operator?.payWithPg,
  });
  const authStore = useStore<any>({
    user: null,
  });

  const formSubmitting = useSignal(false);

  const navigate = useNavigate();
  interface ValidationErrors {
    formErrors: string[];
    fieldErrors: {
      [field: string]: string[];
    };
  }

  const bank = useSignal<BankI>();

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
    formData[name] = value;
    resetErrors();
    console.log("name", name, target.name, formData[name]);
  });

  // useOnDocument(
  //   "load",
  //   $(async () => {
  //     const auth = localStorage.getItem("auth");

  //     if (!auth) {
  //       navigate("/login");
  //     }
  //     // Get the token
  //     // console.log(localStorage.getItem("auth"));

  //     authStore.user = JSON.parse(auth!);
  //     console.log(authStore.user);
  //     formData.availableCredt = authStore.user.AvailableCredit;
  //     formData.minWithdraw = authStore.user;
  //     const token = authStore.user.token;

  //     if (!token) {
  //       alert("You need to be logged in to fetch bank info.");
  //       navigate("/");
  //       return;
  //     }

  //     const bankInfoResult = await fetchBankInfo(token);

  //     if (!bankInfoResult.success) {
  //       console.log("Error", bankInfoResult.error);
  //       alert("Error");
  //     } else {
  //       bank.value = bankInfoResult.data;
  //       formData.payWithPg =
  //         bankInfoResult.data.Operator.payWithPg === 1 ? true : false;
  //       formData.minWithdraw = bankInfoResult.data.Operator?.min?.va?.Withdraw;
  //       console.log(bankInfoResult.data);
  //     }
  //   }),
  // );

  useVisibleTask$(async () => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
    }
    // Get the token
    // console.log(localStorage.getItem("auth"));

    authStore.user = JSON.parse(auth!);
    console.log(authStore.user);
    formData.availableCredt = authStore.user.AvailableCredit;
    formData.minWithdraw = authStore.user;
    const token = authStore.user.token;

    if (!token) {
      alert("You need to be logged in to fetch bank info.");
      navigate("/");
      return;
    }

    const bankInfoResult = await fetchBankInfo(token);

    if (!bankInfoResult.success) {
      console.log("Error", bankInfoResult.error);
      alert("Error");
    } else {
      bank.value = bankInfoResult.data;
      formData.payWithPg =
        bankInfoResult.data.Operator.payWithPg === 1 ? true : false;
      formData.minWithdraw = bankInfoResult.data.Operator?.min?.va?.Withdraw;
      console.log(bankInfoResult.data);
    }
  });

  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();

    console.log("form Data", formData);

    const schema = z.object({
      amount: z
        .string()
        .min(1, { message: "Jumlah harus diisi" })
        .refine(
          (value = "") => {
            const formattedAmount = Number(
              value.replace(/\./g, "").replace(/,/g, "."),
            );

            if (bank.value && bank.value.Operator) {
              const minAmount = bank.value.Operator.min.va.Withdraw;
              if (formattedAmount < minAmount) {
                return false;
              } else if (formattedAmount > authStore.user.AvailableCredit) {
                // throw new Error(
                //   "Amount must be less than " + authStore.user.AvailableCredit,
                // );
                return false;
              } else {
                return true;
              }
            }
          },
          {
            message: `Minimum ${bank.value && bank.value.Operator.min.va.Withdraw} and max ${authStore.user.AvailableCredit}`,
            path: ["amount"],
          },
        ),
    });

    const result = schema.safeParse(formData);

    if (!result.success) {
      // console.error("Validation errors:", result);
      fieldErrors.fieldErrors = result.error.formErrors.fieldErrors;
      console.log("ERRORS", fieldErrors.fieldErrors);
      return;
    }

    const token = authStore.user.token;

    if (!token) {
      alert("You need to be logged in to withdraw.");
      navigate("/");
      return;
    }
    formSubmitting.value = true;

    const withdrawResult = await fetchWithdraw(formData, token);

    if (withdrawResult.success) {
      formSubmitting.value = false;
      await fetchBalance(authStore.user.token);
      alert("Withdrawal successful");
      navigate("/lobby");
    } else {
      formSubmitting.value = false;
      alert(withdrawResult.error);
    }
  });

  return (
    <>
      <section>
        {formSubmitting.value && <LoaderPage />}
        <div class=" h-full pb-10 text-white">
          {/* <div class="border-b-2 border-solid border-white py-3 pl-2">
            <h1 class="text-2xl font-bold"></h1>
            <div class="text-lg">
              Balance:
              <span class="font-bold">Rp. {formData.availableCredt}</span>
            </div>
          </div> */}
          <div class="px-2 ">
            <div class="text-lg uppercase text-sky-400">form withdraw</div>
            <div class="my-2 border-b-2 border-solid border-white"></div>
            <div>
              <div class="mb-2 mt-5 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Jumlah penarikan<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <CustomInput
                    label="Amount"
                    placeholder="Masukan jumlah penarikan"
                    name="amount"
                    type="number"
                    errors={
                      fieldErrors.fieldErrors && fieldErrors.fieldErrors.amount
                    }
                    onInput={$((e) => handleInputChange(e as Event))}
                    autocomplete="off"
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                  />
                </div>
              </div>
              <p></p>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-2/3">
                  Dana akan dikirim ke
                </div>
              </div>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Nama Bank<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">{bank.value?.player.bank}</div>
              </div>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Nama Rekening<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  {bank.value?.player.bankAccountName}
                </div>
              </div>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  No Rekening<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">{bank.value?.player.bankAccount}</div>
              </div>
              <div class="px-2">
                <button
                  class="leading-wide mx-auto mb-3 block w-full rounded-full bg-[linear-gradient(to_bottom,#16931c_0%,#40d04a_50%,#00FF00_100%)] py-2 text-lg font-bold uppercase text-white"
                  style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
                  onClick$={handleSubmit}
                >
                  Withdraw
                </button>
              </div>
            </div>
            <div class="px-2">
              <a href="/lobby">
                <button
                  class="leading-wide mx-auto block w-full rounded-full bg-[linear-gradient(to_bottom,#c0392b_0%,#ad0000_50%,#c0392b_100%)] py-2 text-lg font-bold uppercase text-white"
                  style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
                >
                  kembali
                </button>
              </a>
            </div>
            <span class="font-bold">
              Pastikan selalu cek lampu bank WD sebelum mau ajukan Form bila
              lampu kuning berarti sedang gangguan dan WD tak bisa diproses
              sampai lampu Hijau / normal kembali
            </span>
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
