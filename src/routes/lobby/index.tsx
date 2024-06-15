import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import LobbyHeader from "~/components/LobbyHeader";

// const handleClick$ = $((_: any, direction: string) => {
//   const el = document.querySelector(".no-scrollbar") as HTMLElement;
//   if (direction == "right") {
//     el.scrollLeft += 50;
//   } else {
//     el.scrollLeft -= 50;
//   }
// });

export default component$(() => {
  return (
    <>
      <section>
        <div class="mt-16 h-full">
          <div class="bg-sky-900 py-3 pl-2 text-white accent-sky-100 ">
            <div class="border-b-2 border-solid border-white py-3 pl-2">
              <h1 class="text-2xl font-bold">testertobrut</h1>
              <div class="text-lg">
                Balance: <span class="font-bold">Rp. 0</span>
              </div>
            </div>
            <LobbyHeader />
            <iframe
              class="mt-2 h-full w-full rounded-md"
              src="https://doraemon.wirosablengonline.com/?auth_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcnRvYnJ1dCIsInJvbGUiOiJQTEFZRVIiLCJhZ2VudE5hbWUiOiJ0b2dlbGJydXRhbCIsIlRhYmxlTGltaXQiOiJMT1ciLCJjdXJyZW5jeSI6IklEUiIsInlnZ1Rva2VuIjoiMWIxMmNkZDUzYTI4ZjdhODBkNDY1N2Q2YTc2MDMzMzgiLCJpYXQiOjE3MTgxNjQwMDIsImV4cCI6MTcxODE2NzYwMn0.ZrD5It7iKctpyRCQIo5VWnVOfnR03J0Jxtcdmkvmjq0&amp;agent=togelbrutal"
              id="doraFrame"
              scrolling="no"
              style="height: 32px;"
            ></iframe>
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
