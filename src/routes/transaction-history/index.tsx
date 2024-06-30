import {
  $,
  component$,
  useContext,
  useStore,
  useVisibleTask$,
  useSignal,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { DatePicker } from "~/components/DatePicker";
import { AuthContext } from "~/context/auth-context";

interface PlayerStatsI {
  date: string;
  validTurnover: string;
  playerWinLoss: string;
}

export default component$(() => {
  const oneWeekBefore = new Date();
  oneWeekBefore.setDate(new Date().getDate() - 7);

  const authStore = useContext(AuthContext);

  const store = useStore({
    dateStart: oneWeekBefore,
    dateEnd: new Date(),
    playerStats: [] as PlayerStatsI[],
  });

  const playerName = useSignal<string | null>(null);
  useVisibleTask$(() => {
    playerName.value = authStore.user.username;
  });

  const handleInputChange = $((e: Event) => {
    const target = e.target as HTMLInputElement;
    const name: string = target.name;
    const value: string = target.value;
    (store as any)[name] = new Date(value);
  });

  const loadPlayerStats = $(async () => {
    const startDate = store.dateStart.toISOString().split("T")[0];
    const endDate = store.dateEnd.toISOString().split("T")[0];

    const response = await fetch(
      `${import.meta.env.PUBLIC_QWIK_API_URL}api/yoda/playersummary?playerName=${playerName.value}&dateStart=${startDate}&dateEnd=${endDate}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch player stats");
    }
    store.playerStats = await response.json();
  });

  useVisibleTask$(() => {
    loadPlayerStats();
  });

  const onClickSubmit = $(() => {
    loadPlayerStats();
  });

  return (
    <>
      <section>
        <div class="mt-20 h-full">
          <div class="px-5 text-white">
            <div class="border-b-2 border-solid border-white text-center">
              <p class="pb-2 text-lg capitalize">Ringkasan permainan</p>
            </div>

            <div class="space-y-4">
              <div class="my-3 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Date From<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <DatePicker onInput={handleInputChange} name="dateStart" />
                </div>
              </div>
              <div class="my-3 flex w-full">
                <div class="my-auto flex h-full w-1/3">
                  Date To:<div class="grow"></div>:
                </div>
                <div class="w-2/3 px-2">
                  <DatePicker onInput={handleInputChange} name="dateEnd" />
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
                      Tanggal
                    </th>
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Valid Turnover
                    </th>
                    <th class="border-b border-solid border-b-white px-0 py-2.5">
                      Player P/L
                    </th>
                  </tr>
                </thead>
                <tbody id="transaction">
                  {store.playerStats.map((item) => (
                    <tr class="pl-0 text-center align-middle leading-3 text-white">
                      <td class="border-b border-solid border-b-white px-0 py-2.5">
                        {item.date}
                      </td>
                      <td class="border-b border-solid border-b-white px-0 py-2.5">
                        {item.validTurnover}
                      </td>
                      <td class="border-b border-solid border-b-white px-0 py-2.5">
                        {item.playerWinLoss}
                      </td>
                    </tr>
                  ))}
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
