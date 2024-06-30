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
import CustomInput from "~/components/common/form/CustomInput";
import CustomSelect from "~/components/common/form/CustomSelect";
import { AuthContext } from "~/context/auth-context";
import { BankI, BankInfoI, DepositRequestI, OperatorI } from "~/data/auth";

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

  const getBank = $(() => {
    try {
      const url = import.meta.env.PUBLIC_QWIK_API_URL + `api/gemini/bank`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.user.token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          bank.value = data;

          console.log("Bank", bank.value);
          isBankRetrieved.value = true;
          // console.log("Data", data);
        })
        .catch((err) => {
          console.log("error", err);
          isBankRetrieved.value = false;
        });
    } catch (error) {
      console.error("Error fetching balance:", error);
      isBankRetrieved.value = false;
    }
  });
  useVisibleTask$(() => {
    const auth = localStorage.getItem("auth");

    console.log("Contextuser", authContext.user);
    if (!auth) {
      navigate("/login");
    }
    // Get the token
    // console.log(localStorage.getItem("auth"));

    authStore.user = JSON.parse(auth!);
    console.log(authStore.user);

    try {
      const url = import.meta.env.PUBLIC_QWIK_API_URL + `api/gemini/bank`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.user.token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          bank.value = data;

          console.log("Bank", bank.value);
          isBankRetrieved.value = true;
          // console.log("Data", data);
        })
        .catch((err) => {
          console.log("error", err);
          isBankRetrieved.value = false;
        });
    } catch (error) {
      console.error("Error fetching balance:", error);
      isBankRetrieved.value = false;
    }
  });

  const handleSubmit = $((e: Event) => {
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
              throw new Error(
                `Deposit amount must be at least ${minimumDeposit}`,
              );
            }
          }
          return true;
        },
        {
          message: "Minimum 0 and max 10000000",
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

    const deposit = async (
      fields: DepositRequestI,
      url: string,
      token: string,
    ) => {
      return await fetch("/api/gemini/deposit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...fields,
          return_url: `${window.location.protocol}//${window.location.host}`,
        }),
      }).then(async (res) => {
        return await res.json();
      });
    };
    const url = import.meta.env.PUBLIC_QWIK_API_URL + "api/gemini/deposit";
    const token = authStore.user.token;
    deposit(
      {
        amount: parseInt(formData.amount),
        bank: formData.bankAccountName,
      },
      url,
      token,
    ).then((response) => {
      if (!response.success) {
        console.log("err", response.err_message);
      } else {
        getBank();
        console.log(response);
        // retrieveBankInfo();
      }
    });
    // const response = await fetch(
    //   `${import.meta.env.PUBLIC_QWIK_API_URL}/api/gemini/register`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       referralCode: formData.referralCode,
    //       userName: formData.username,
    //       password: formData.password,
    //       eMail: formData.email,
    //       telephone: formData.telephone,
    //       bank: formData.bank,
    //       bankName: formData.bankName,
    //       bankAccount: formData.bankAccount,
    //     }),
    //   },
    // );

    console.log(result);
  });

  return (
    <>
      {bank.value && bank.value.pendingDeposit && (
        <DepositPending bank={bank.value} />
      )}
      {bank.value && !bank.value.pendingDeposit && (
        <section>
          <div class="mt-16 h-full pb-10 text-white">
            <div class="border-b-2 border-solid border-white py-3 pl-2">
              <h1 class="text-2xl font-bold">testertobrut</h1>
              <div class="text-lg">
                Balance: <span class="font-bold">Rp. 0</span>
              </div>
            </div>
            <div class="pl-2">
              <div class="text-lg uppercase text-sky-400">form deposit</div>
              <div class="my-2 border-b-2 border-solid border-white"></div>
              <div>
                Bank: <span class="font-bold">BCA</span>
              </div>
              <div>
                Nama Rekening: <span class="font-bold">bambang gentolet</span>
              </div>
              <div class="mb-5">
                No Rekening: <span class="font-bold">92919192...1211</span>
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
                <div class="mb-2 mt-5 border-b-2 border-solid border-gray-500"></div>
                <div>
                  Nama Rekening: <span class="font-bold">-</span>
                </div>
                <div>
                  No Rekening: <span class="font-bold">-</span>
                </div>
                <button class="my-1 rounded-xl bg-sky-600 px-4 py-1.5">
                  Copy
                </button>
                <div class="mx-auto block w-11/12 rounded-full border border-solid border-sky-700 bg-white py-2 capitalize text-black">
                  <img
                    src="https://assets.nosenachos.xyz/images/banks/QRIS.png"
                    class="mx-2 inline-block h-8 w-8"
                    alt="logo"
                    height={40}
                    width={40}
                  />
                  QRIS
                </div>
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
