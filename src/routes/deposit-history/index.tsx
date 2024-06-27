import {
  $,
  component$,
  useContext,
  useOnWindow,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { DatePicker } from "~/components/DatePicker";
import { AuthContext } from "~/context/auth-context";

interface DepositHistoryI {
  playerName: string;
  transactionTime: string;
  type: string;
  winLose: string;
  status: string;
}

export default component$(() => {
  const oneWeekBefore = new Date();
  oneWeekBefore.setDate(new Date().getDate() - 7);

  const authContext = useContext(AuthContext);

  const store = useStore({
    fromDate: oneWeekBefore,
    toDate: new Date(),
    depositHistories: [] as DepositHistoryI[],
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    const name: string = target.name;
    const value: string = target.value;
    store[name] = value;
    console.log("name", name, target.name, store[name]);
  });

  const navigate = useNavigate();
  const loadTransactions = $(async () => {
    console.log("auth", authContext.user);
    const startDate = store.fromDate.toISOString().split("T")[0];
    const endDate = store.toDate.toISOString().split("T")[0];
    if (authContext.user.username) {
      const response = await fetch(
        `/api/yoda/playerTransactions/?${authContext.user.username}&dateStart=${startDate}&dateEnd=${endDate}`,
      ).then(async (fetchResult) => await fetchResult.json());
      store.depositHistories = response;

      console.log("res", response);
    } else {
      console.log("error", authContext.user);
    }
  });

  const onClickSubmit = $(async () => {
    console.log("auth", authContext.user);
    const startDate = store.fromDate.toISOString().split("T")[0];
    const endDate = store.toDate.toISOString().split("T")[0];
    if (authContext.user.username) {
      const response = await fetch(
        `/api/yoda/playerTransactions/?${authContext.user.username}&dateStart=${startDate}&dateEnd=${endDate}`,
      ).then(async (fetchResult) => await fetchResult.json());
      store.depositHistories = response;

      console.log("res", response);
    } else {
      console.log("error", authContext.user);
    }
  });

  useVisibleTask$(() => {
    const oneWeekBefore = new Date();
    oneWeekBefore.setDate(new Date().getDate() - 7);
    store.fromDate = oneWeekBefore;
    store.toDate = new Date();
    loadTransactions();
    // console.log("EXECUTING NOW,...........", authContext.user.userName);
    // await onClickSubmit();
  });

  // useVisibleTask$(() => {
  //   console.log("One week befoe", oneWeekBefore);
  //   console.log("Contextuser", authContext.user);
  // });
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
                  <DatePicker
                    onInput={$((e) => handleInputChange(e as Event))}
                    name="fromDate"
                  />
                </div>
              </div>
              <div class="my-3 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Date To:<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <DatePicker
                    onInput={$((e) => handleInputChange(e as Event))}
                    name="toDate"
                  />
                </div>
              </div>
            </div>
            <button
              class="leading-wide mb-3 block w-1/4 rounded-lg bg-[#22c55e] py-2 font-bold  uppercase text-white lg:py-3"
              style="text-shadow: rgba(0, 0, 0, 0.7) 2px 1px 9px;"
              onClick$={onClickSubmit}
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
                  {store.depositHistories?.map((item) => {
                    return (
                      <tr class="pl-0 text-center align-middle leading-3 text-white">
                        <td class="border-b border-solid border-b-white px-0 py-2.5">
                          {item.transactionTime}
                        </td>
                        <td class="border-b border-solid border-b-white px-0 py-2.5">
                          {item.type}
                        </td>
                        <td class="border-b border-solid border-b-white px-0 py-2.5">
                          {item.winLose}
                        </td>
                        <td class="border-b border-solid border-b-white px-0 py-2.5">
                          {item.status}
                        </td>
                      </tr>
                    );
                  })}
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
