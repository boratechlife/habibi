import {
  $,
  component$,
  useOn,
  useOnDocument,
  useOnWindow,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, z, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const navigate = useNavigate();
  const showTersalin = useSignal<Boolean>(false);
  const isBankRetrieved = useSignal<Boolean>(false);
  const authStore = useStore<any>({
    user: null,
  });
  const bank = useSignal(null);
  //const accountList = bank?.Operator?.banks.filter((bank) => bank.isShow) || [];

  useVisibleTask$(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
    }
    // Get the token
    // console.log(localStorage.getItem("auth"));

    authStore.user = JSON.parse(auth!);
    console.log(authStore.user);

    try {
      const url = import.meta.env.PUBLIC_QWIK_API_URL + `api/gemini/bank`;
      const response = fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.user.token}`,
        },
      })
        .then(async (response) => {
          const data = await response.json();
          bank.value = data;
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

  // const schema = z.object({
  //   amount: z.string().refine(value => {
  //     const formattedAmount = Number(value.replaceAll(".", "").replaceAll(",", "."));
  //     if (bank.Operator) {
  //       const bankType = (bank.Operator?.banks
  //         .find((bank: BankInfoI) =>
  //           bank.bankName === watch("bankAccountName").split("-")[0])
  //         ?.category.toLowerCase() as keyof OperatorI["min"]) || "emoney";

  //       const minimumDeposit: number =
  //         bankType === "va" ? bank.Operator.min?.va.Deposit : bank.Operator.min?.[bankType];

  //       if (formattedAmount < minimumDeposit) {
  //         throw new Error(`Deposit amount must be at least ${minimumDeposit}`);
  //       }
  //     }
  //     return true;
  //   }, {
  //     message: "Minimum 0 and max 10000000"
  //   }),
  //   bankAccountName: z.string().min(1, "Nama pengguna harus diisi")
  // });

  return (
    <>
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
            <form>
              <div class="flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Pilih metode pembayaran<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <select
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                    name="bankAccountName"
                  >
                    <option value="QRIS--">QRIS | -</option>
                  </select>
                </div>
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
                />
                QRIS
              </div>
              <div class="mb-2 mt-5 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Jumlah Deposit<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <input
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                    placeholder="Masukan jumlah deposit"
                    name="amount"
                  />
                </div>
              </div>
              <p></p>
              <button class="uppercase">idr</button>
              <button
                class="leading-wide mx-auto mb-3 block w-11/12 rounded-full bg-[linear-gradient(to_bottom,#16931c_0%,#40d04a_50%,#00FF00_100%)] py-2 text-lg font-bold uppercase text-white"
                style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
              >
                Deposit
              </button>
            </form>
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
              transaksi ke rekening kami. Silahkan hubungi kami melalui whatsapp
              / livechat jika deposit anda ditolak atau tidak berhasil diproses.
              berikan bukti transfer anda yang sah kepada kami melalui layanan
              costumer service, terimakasih. #SALAMJPPAUS
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
