import { $, component$, useSignal } from "@builder.io/qwik";
import { CountdownTimer } from "./CountDownTimer";
import { QRCodeComponent } from "./QRCodeComponent";
import QRCode from "qrcode";
import { DepositHowTo } from "./DepositHowTo";

interface BankComponentProps {
  bank: any;
}

export default component$<BankComponentProps>(({ bank }) => {
  const showTersalin = useSignal(false);
  const downloadaQRCODE = $(() => {
    QRCode.toDataURL(bank.details.address)
      .then((url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const copyToClipboard = $(() => {
    navigator.clipboard.writeText(bank.details?.address || "");
    showTersalin.value = true;
    setTimeout(() => {
      showTersalin.value = false;
    }, 1000);
  });

  return (
    <section class=" pt-20">
      <div class="rounded-lg p-2 text-white">
        <div class="mx-2">
          <div class="flex flex-col items-center justify-center space-y-0.5 py-2">
            <div class="my-2">
              Harap lakukan pembayaran sebelum waktu habis!
            </div>
            <div class="inline-flex w-full items-center justify-center space-x-2 text-xs">
              <div class="text-whte w-full rounded-full">
                <div class="false rounded-full bg-blue-600 p-1.5 text-center text-lg font-medium leading-none text-blue-100">
                  <span>
                    {" "}
                    <CountdownTimer minutes={30} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* {bank.details?.wallet && (
            <div class="flex flex-col">
              <p>Harap selesaikan transaksi anda di DANA!</p>
              <a
                href={`${bank.details.checkout_url}`}
                title="Link ke dana"
                class="my-2 w-full rounded bg-emerald-800 px-4 py-2 text-center font-bold text-white hover:bg-red-700 md:w-56"
              >
                Klik sini untuk ke DANA
              </a>
            </div>
          )} */}
        </div>

        {bank.details?.contentQris ||
          (bank.details?.type === "qris" && (
            <>
              <div class="my-2 flex flex-col justify-center">
                <div class="flex justify-center">
                  <QRCodeComponent qrData={bank.details?.address} />
                </div>
                <div class="my-2 w-full bg-slate-400 bg-opacity-50 px-2">
                  <div class="w-full p-2">
                    <p class="break-words text-center">
                      Simpan dan upload kode di aplikasi yang mendukung QRIS
                    </p>
                  </div>
                  <button
                    onClick$={downloadaQRCODE}
                    class="my-2 w-full rounded bg-yellow-500 px-4 py-2 font-semibold uppercase tracking-widest text-white hover:bg-blue-700"
                  >
                    Simpan Kode di perangkat
                  </button>
                </div>
              </div>
              <div class="flex w-full">
                <div class="mb-2 inline-flex w-full items-center rounded-md border-2 border-dotted border-sky-300 p-2">
                  <div class="w-1/2">Nilai Transfer</div>
                  <div class="w-1/2 font-bold text-red-400">
                    IDR {bank.details.amount.toLocaleString("en-ID")}
                  </div>
                </div>
              </div>
              <div>
                <div class="my-2 border-b-2 border-b-slate-500 py-2 font-semibold uppercase tracking-wide">
                  Cara deposit
                </div>

                <div class="min-h-sceen mx-2 max-w-screen-xl rounded-md bg-sky-600 px-5 md:m-0">
                  <DepositHowTo bank="QRIS" />
                </div>
              </div>
            </>
          ))}

        {/* {bank.details?.type === "va" && (
          <>
            <div class="flex flex-col">
              <div class="mb-2 inline-flex items-center rounded-md border-2 border-dotted border-sky-300 p-2">
                <div class="flex w-full flex-col pr-2">
                  <h1 class="text-xl">
                    {bank.details?.bank?.split("_")[1].toUpperCase() ||
                      bank.details?.bankCode.toUpperCase()}
                  </h1>
                  <hr />
                  <span class="pt-2 text-sm">
                    Nomor Virtual Account untuk bank {bank.details?.bankCode}:
                  </span>
                  <span class="font-bold">{bank.details?.address}</span>
                </div>
                <div class="grow-0">
                  <button
                    id="test"
                    class="bg-marquee w-28 rounded-md p-2 font-semibold uppercase text-white"
                    onClick$={copyToClipboard}
                  >
                    {showTersalin.value ? "tersalin" : "Tersalin"}
                  </button>
                </div>
              </div>
            </div>

            <div class="flex w-full flex-col">
              <div class="mb-2 inline-flex w-full items-center rounded-md border-2 border-dotted border-sky-300 p-2">
                <div class="w-1/2">Nilai Transfer</div>
                <div class="w-1/2 font-bold text-red-400">
                  IDR {bank.details.amount.toLocaleString("en-ID")}
                </div>
              </div>
            </div>
            <DepositHowTo
              va-account-number={bank.details?.address}
              bank={
                bank.details?.bank?.split("_")[1].toUpperCase() ||
                bank.details?.bankCode === "demo"
                  ? "BCA"
                  : bank.details?.bankCode.toUpperCase()
              }
            />
          </>
        )} */}
      </div>
    </section>
  );
});
