import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
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
          <div class="pl-2 pt-10">
            <div class="text-lg uppercase text-sky-400">form withdraw</div>
            <div class="my-2 border-b-2 border-solid border-white"></div>
            <form>
              <div class="mb-2 mt-5 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Jumlah penarikan<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <input
                    class="h-10 w-full rounded-full border-2 border-solid border-sky-500 px-3 text-black"
                    placeholder="Masukan jumlah penarikan"
                    name="amount"
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
                <div class="w-2/3 px-2"></div>
              </div>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Nama Rekening<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2"></div>
              </div>
              <div class="mb-2 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  No Rekening<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2"></div>
              </div>
              <div class="px-2">
                <button
                  class="leading-wide mx-auto mb-3 block w-full rounded-full bg-[linear-gradient(to_bottom,#16931c_0%,#40d04a_50%,#00FF00_100%)] py-2 text-lg font-bold uppercase text-white"
                  style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
                >
                  Withdraw
                </button>
              </div>
            </form>
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
