import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { DatePicker } from "~/components/DatePicker";

export default component$(() => {
  return (
    <>
      <section>
        <div class="mt-20 h-full">
          <div class="px-5 text-white">
            <div class="border-b-2 border-solid border-white text-center">
              <p class="pb-2 text-lg capitalize">Cash Report</p>
            </div>
            <div class="space-y-4">
              <div class="my-3 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Date From<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <DatePicker />
                </div>
              </div>
              <div class="my-3 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Date To:<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <DatePicker />
                </div>
              </div>
            </div>
            <button
              class="leading-wide mb-3 block w-1/4 rounded-lg bg-[#22c55e] py-2 font-bold  uppercase text-white lg:py-3"
              style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
            >
              submit
            </button>
            <div class="mt-5 rounded-[25px] border-2 border-solid border-[#0067a2] bg-transparent p-2.5 shadow-[#0080c7_0_0_7px_0]">
              <table
                class="clear-both mb-2.5 w-full border-separate border-none text-sm"
                style="overflow-x: auto;"
              >
                <thead>
                  <tr class="pl-0 text-center align-middle font-bold leading-3 text-white">
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Date
                    </th>
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Type
                    </th>
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Amount
                    </th>
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody id="transaction">
                  <tr class="pl-0 text-center align-middle leading-3 text-white">
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      2024-06-01
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Deposit
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      $1000
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Completed
                    </td>
                  </tr>
                  <tr class="pl-0 text-center align-middle leading-3 text-white">
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      2024-06-02
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Withdrawal
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      $500
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Pending
                    </td>
                  </tr>
                  <tr class="pl-0 text-center align-middle leading-3 text-white">
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      2024-06-03
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Deposit
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      $1500
                    </td>
                    <td class="border-b border-solid border-b-white px-0 py-2.5">
                      Completed
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
