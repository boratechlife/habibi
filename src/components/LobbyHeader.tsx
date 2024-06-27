import { $, component$ } from "@builder.io/qwik";

const handleClick$ = $((_: any, direction: string) => {
  const el = document.querySelector(".no-scrollbar") as HTMLElement;
  if (direction == "right") {
    el.scrollLeft += 50;
  } else {
    el.scrollLeft -= 50;
  }
});

export default component$(() => {
  return (
    <>
      <div class="flex">
        <i
          class="top-0 flex items-center px-1 py-0 lg:hidden"
          onClick$={(e) => handleClick$(e, "left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="h-5 w-5 text-white"
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </i>
        <div class="no-scrollbar my-1 flex overflow-x-scroll lg:w-full lg:overflow-x-hidden ">
          <div class="flex flex-col md:w-full">
            <main class="row m-0 flex  w-full overflow-hidden">
              <div
                id="cat-99"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a
                  target="_self"
                  href="/games/99"
                  style="pointer-events: auto;"
                >
                  <p>favorit</p>
                </a>
              </div>
              <div
                id="cat-12"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case lg:normal-case"
              >
                <a target="_self" href="/lobby" style="pointer-events: auto;">
                  <p>Togel</p>
                </a>
              </div>
              <div
                id="cat-0"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a target="_self" href="/games/0" style="pointer-events: auto;">
                  <p>Slots</p>
                </a>
              </div>
              <div
                id="cat-70"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a
                  target="_self"
                  href="/games/70"
                  style="pointer-events: auto;"
                >
                  <p>Live Kasino</p>
                </a>
              </div>
              <div
                id="cat-9"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a target="_self" href="/games/9" style="pointer-events: auto;">
                  <p>Arcade</p>
                </a>
              </div>
              <div
                id="cat-7"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a target="_self" href="/games/7" style="pointer-events: auto;">
                  <p>Ikan</p>
                </a>
              </div>
              <div
                id="cat-1"
                class="ml-auto block min-w-[5.5rem] whitespace-nowrap rounded-lg p-4 text-center text-xs uppercase text-gray-400 transition-all duration-[0.3s] hover:rounded-lg hover:bg-blue-200 hover:text-white focus:rounded focus:no-underline lg:normal-case"
              >
                <a target="_self" href="/games/1" style="pointer-events: auto;">
                  <p>Game Meja</p>
                </a>
              </div>
            </main>
          </div>
        </div>
        <i
          class="top-0 flex items-center px-1 py-0 lg:hidden"
          onClick$={(e) => handleClick$(e, "right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="h-5 w-5 text-white"
          >
            <path
              fill-rule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </i>
      </div>
    </>
  );
});
