/* eslint-disable qwik/no-use-visible-task */
import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, z, type DocumentHead } from "@builder.io/qwik-city";
import DepositPending from "~/components/DepositPending";
import { LoaderPage } from "~/components/LoaderPage";
import CustomInput from "~/components/common/form/CustomInput";
import CustomSelect from "~/components/common/form/CustomSelect";
import { AuthContext } from "~/context/auth-context";
import type { BankI, BankInfoI, OperatorI } from "~/data/auth";
import { fetchBankInfo, fetchDeposit } from "~/utils/Main";

interface Player {
  bank: string;
  bankAccount: string;
  bankAccountName: string;
  name: string;
  isValidate: number;
  totalWithdraw: number;
}

interface Bank {
  category: string;
  bankStatus: boolean;
  isShow: boolean;
  bankName: string;
  image: string;
  bankAccountName: string;
  bankAccountNo: string;
}

interface Min {
  bank: number;
  emoney: number;
  va: {
    Deposit: number;
    Withdraw: number;
  };
  qris: number;
}

interface Operator {
  AutoBankAcc: boolean;
  banks: Bank[];
  min: Min;
  payWithPg: number;
}

export interface UserAccount {
  player: Player;
  Operator: Operator;
  pendingMinutes: number | null;
  pendingDeposit: boolean;
}

export default component$(() => {
  const navigate = useNavigate();
  // const showTersalin = useSignal<Boolean>(false);
  const isBankRetrieved = useSignal<any>(false);
  const formSubmitting = useSignal(false);
  const formData = useStore<any>({
    bankAccountName: "",
    amount: 0,
  });

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
    formData[name] = value;
    resetErrors();
    console.log("name", name, target.name, formData[name]);
  });

  const authStore = useStore<any>({
    user: null,
  });
  const bank = useSignal<BankI>();
  const authContext = useContext(AuthContext);
  //const accountList = bank?.Operator?.banks.filter((bank) => bank.isShow) || [];

  const getBank = $(async () => {
    const token = authStore.user.token;

    if (!token) {
      alert("You need to be logged in to fetch bank info.");
      navigate("/");
      return;
    }

    const bankInfoResult = await fetchBankInfo(token);

    if (!bankInfoResult.success) {
      console.log("Error", bankInfoResult.error);
      isBankRetrieved.value = false;
    } else {
      bank.value = bankInfoResult.data;
      isBankRetrieved.value = true;
      console.log("Bank", bank.value);
    }
  });

  useVisibleTask$(async () => {
    const auth = localStorage.getItem("auth");

    console.log("Contextuser", authContext.user);
    if (!auth) {
      navigate("/login");
    }
    // Get the token
    // console.log(localStorage.getItem("auth"));
    authStore.user = JSON.parse(auth!);
    console.log(authStore.user);
    await getBank();
  });

  const handleSubmit = $(async (e: Event) => {
    let minimumDeposit = 0;
    if (bank.value && bank.value.Operator) {
      const bankType =
        (bank.value.Operator?.banks
          .find(
            (bank: BankInfoI) =>
              bank.bankName === formData.bankAccountName.split("-")[0],
          )
          ?.category.toLowerCase() as keyof OperatorI["min"]) || "emoney";

      minimumDeposit =
        bankType === "va"
          ? bank.value.Operator.min?.va.Deposit
          : bank.value.Operator.min?.[bankType];
    }

    const schema = z.object({
      amount: z.string().refine(
        (value) => {
          const formattedAmount = Number(
            value.replaceAll(".", "").replaceAll(",", "."),
          );
          if (bank.value && bank.value.Operator) {
            const bankType =
              (bank.value.Operator?.banks
                .find(
                  (bank: BankInfoI) =>
                    bank.bankName === formData.bankAccountName.split("-")[0],
                )
                ?.category.toLowerCase() as keyof OperatorI["min"]) || "emoney";

            const minimumDeposit: number =
              bankType === "va"
                ? bank.value.Operator.min?.va.Deposit
                : bank.value.Operator.min?.[bankType];

            if (formattedAmount < minimumDeposit) {
              //new Error(`Deposit amount must be at least ${minimumDeposit}`);
              return false;
            }
          }
          return true;
        },
        {
          message: `Minimum ${minimumDeposit} and max 10000000`,
        },
      ),
      bankAccountName: z.string().min(1, "Nama pengguna harus diisi"),
    });
    e.preventDefault();
    console.log("form Data", formData);

    const result = schema.safeParse(formData);

    if (!result.success) {
      // console.error("Validation errors:", result);
      fieldErrors.fieldErrors = result.error.formErrors.fieldErrors;
      console.log("ERRORS", fieldErrors.fieldErrors);
      return;
    }
    formSubmitting.value = true;
    const token = authStore.user.token;
    console.log("Token", token);
    if (!token) {
      alert("You need to be logged in to make a deposit.");
      navigate("/");
      return;
    }

    const depositResult = await fetchDeposit(
      {
        amount: parseInt(formData.amount),
        bank: formData.bankAccountName,
      },
      token,
    );

    if (!depositResult.success) {
      formSubmitting.value = false;
      alert("Error occured");
      if (depositResult.error == "token invalid") {
        // await fetchLogout()
        console.log("Log him outt");
      }
      console.log("err", depositResult);
    } else {
      await getBank();
      formSubmitting.value = false;
      console.log(depositResult.data);
      // retrieveBankInfo();
    }

    console.log(result);
  });

  return (
    <>
      {formSubmitting.value && <LoaderPage />}
      {bank.value && bank.value.pendingDeposit && (
        <DepositPending bank={bank.value} />
      )}
      {bank.value && !bank.value.pendingDeposit && (
        <section>
          <div class="mt-16 h-full pb-10 text-white">
            <div class="border-b-2 border-solid border-white py-3 pl-2">
              <h1 class="text-2xl font-bold">{authContext.user.username}</h1>
              <div class="text-lg">
                Balance:
                <span class="font-bold">
                  Rp. {authContext.user.AvailableCredit}
                </span>
              </div>
            </div>
            <div class="pl-2">
              <div class="text-lg uppercase text-sky-400">form deposit</div>
              <div class="my-2 border-b-2 border-solid border-white"></div>
              <div>
                Bank: <span class="font-bold">{bank.value.player.bank}</span>
              </div>
              <div>
                Nama Rekening:{" "}
                <span class="font-bold">
                  {bank.value.player.bankAccountName}
                </span>
              </div>
              <div class="mb-5">
                No Rekening:{" "}
                <span class="font-bold">{bank.value.player.bankAccount}</span>
              </div>
              <div>
                <div class="flex w-full">
                  <CustomSelect
                    label="Pilih metode pembayaran"
                    wrapperClasses="w-full"
                    name="bankAccountName"
                    class="h-10 w-2/3  border-2 border-solid border-sky-500 px-3 text-black"
                    errors={
                      fieldErrors.fieldErrors &&
                      fieldErrors.fieldErrors.bankAccountName
                    }
                    placeholderOption="-- Pilih Bank --"
                    onInput={$((e: Event) => handleInputChange(e as Event))}
                    options={[{ label: "QRIS--", value: "QRIS" }]}
                    required
                  />
                </div>
                <p></p>
                {/* <div class="mb-2 mt-5 border-b-2 border-solid border-gray-500"></div>
                <div>
                  Nama Rekening: <span class="font-bold">-</span>
                </div>
                <div>
                  No Rekening: <span class="font-bold">-</span>
                </div>
                <button class="my-1 rounded-xl bg-sky-600 px-4 py-1.5">
                  Copy
                </button> */}
                {/* <div class="mx-auto block w-11/12 rounded-full border border-solid border-sky-700 bg-white py-2 capitalize text-black">
                  <img
                    src="https://assets.nosenachos.xyz/images/banks/QRIS.png"
                    class="mx-2 inline-block h-8 w-8"
                    alt="logo"
                    height={40}
                    width={40}
                  />
                  QRIS
                </div> */}
                <div class="mb-2 mt-5 flex w-full">
                  <CustomInput
                    label=" Jumlah Deposit:"
                    type="number"
                    placeholder="Masukan jumlah deposit"
                    wrapperClasses="w-full"
                    name="amount"
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black lg:w-1/2"
                    errors={
                      fieldErrors.fieldErrors && fieldErrors.fieldErrors.amount
                    }
                    onInput={$((e) => handleInputChange(e as any))}
                    required
                  />
                </div>
                <p></p>
                <button class="uppercase">idr</button>
                <button
                  class="leading-wide mx-auto mb-3 block w-11/12 rounded-full bg-[linear-gradient(to_bottom,#16931c_0%,#40d04a_50%,#00FF00_100%)] py-2 text-lg font-bold uppercase text-white"
                  style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
                  onClick$={handleSubmit}
                >
                  Deposit
                </button>
              </div>
              <a href="/lobby">
                <button
                  class="leading-wide mx-auto block w-11/12 rounded-full bg-[linear-gradient(to_bottom,#c0392b_0%,#ad0000_50%,#c0392b_100%)] py-3 text-lg font-bold uppercase text-white"
                  style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
                >
                  kembali
                </button>
              </a>
              <span class="text-xs">
                Harap perhatikan status bank diatas sebelum anda melakukan
                transaksi ke rekening kami. Silahkan hubungi kami melalui
                whatsapp / livechat jika deposit anda ditolak atau tidak
                berhasil diproses. berikan bukti transfer anda yang sah kepada
                kami melalui layanan costumer service, terimakasih. #SALAMJPPAUS
              </span>
            </div>
          </div>
        </section>
      )}
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
