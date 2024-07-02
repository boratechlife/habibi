// src/components/DatePicker.tsx
import { $, PropFunction, component$, useContext } from "@builder.io/qwik";
import CloseImage from "~/media/close.png?jsx";
import { AuthContext } from "~/context/auth-context";
import { useNavigate } from "@builder.io/qwik-city";
import { fetchLogout } from "~/utils/Main";
interface Props {
  onClick: PropFunction<() => void>;
}

export const Sidebar = component$<Props>(({ onClick }) => {
  const authStore = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = $(async () => {
    document.getElementById("close-button")?.click();
    const token = authStore.user.token;
    if (!token) {
      navigate("/");
    } else {
      const logoutResult = await fetchLogout(token);

      if (logoutResult.success) {
        authStore.user = "";
        localStorage.removeItem("auth");
        onClick();
        navigate("/");
      } else {
        console.log("error", logoutResult.error);
      }
    }
  });

  return (
    <div class="relative ">
      <div
        class="fixed inset-0 h-screen w-full bg-black bg-opacity-40"
        onClick$={onClick}
      ></div>
      <div class=" relative  left-0 z-50 ">
        <div
          class="fixed inset-0 bg-gray-900/80"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
        ></div>
        <div class="fixed inset-0 flex h-screen">
          <div class="translate-x-0">
            <div
              class="relative mr-16 flex h-full w-full max-w-[15rem] flex-1"
              id="headlessui-dialog-panel-:r3:"
              data-headlessui-state="open"
            >
              <div class="flex grow flex-col gap-y-2 overflow-y-auto bg-sky-900 px-2 pb-2 text-white">
                <div class="flex h-16 shrink-0 items-center">
                  <div class="grow"></div>
                  <button type="button" id="close-button" onClick$={onClick}>
                    <span class="sr-only">Close sidebar</span>

                    <CloseImage />
                  </button>
                </div>
                <div class="border border-solid border-gray-800"></div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/lobby"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                            </svg>
                            <span class="my-auto">Beranda</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/deposit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="my-auto">Deposit</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/withdraw"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="my-auto">Withdraw</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/transaction-history"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="my-auto">Laporan Cash</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/deposit-history"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                                clip-rule="evenodd"
                              ></path>
                              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"></path>
                            </svg>
                            <span class="my-auto">Ringkasan permainan</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <a
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                            href="/forgot-password"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="my-auto">Lupa Password</span>
                            <div class="grow"></div>
                            <span class="falseundefined my-auto pr-2">●</span>
                          </a>
                        </li>
                        <li>
                          <button
                            onClick$={handleLogout}
                            class="group flex gap-x-3 rounded-md border-b-2 border-gray-800 p-2 py-1 text-sm font-semibold uppercase leading-6"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              class="mr-1 h-8 w-8 shrink-0 text-white"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span class="my-auto">Keluar</span>
                            <div class="grow"></div>
                            <span class="undefined my-auto hidden pr-2">●</span>
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
