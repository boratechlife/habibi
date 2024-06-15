import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GameCard } from "~/components/GameCard";
import GamesCarousel from "~/components/GamesCarousel";
import { LeftSidebar } from "~/components/LeftSidebar";
import LobbyHeader from "~/components/LobbyHeader";

export default component$(() => {
  return (
    <>
      <section class="flex flex-col  py-20">
        <LobbyHeader />
        <div class="flex">
          <div>
            <LeftSidebar />
          </div>
          <div class="grow"></div>
          <div class="">
            <button class="rounded border border-solid border-white bg-gray-600 px-4 py-1 text-white  lg:px-12">
              Cari Game
            </button>
          </div>
        </div>
        <GamesCarousel />
        <div class="3xl:grid-cols-6 3xl:grid-cols-5 mt-5 grid w-full grid-cols-3 items-center gap-1 px-1 2xl:gap-2">
          <GameCard
            image="https://assets.omdogede.xyz/images/thumbnail/PRAG/vs20gravity.webp"
            link="https://example.com"
            title="Gravity Bonanza™"
          />
          <GameCard
            image="https://assets.omdogede.xyz/images/thumbnail/PRAG/vs20gravity.webp"
            link="https://example.com"
            title="Gravity Bonanza™"
          />
          <GameCard
            image="https://assets.omdogede.xyz/images/thumbnail/PRAG/vs20gravity.webp"
            link="https://example.com"
            title="Gravity Bonanza™"
          />
          <GameCard
            image="https://assets.omdogede.xyz/images/thumbnail/PRAG/vs20gravity.webp"
            link="https://example.com"
            title="Gravity Bonanza™"
          />
          <GameCard
            image="https://assets.omdogede.xyz/images/thumbnail/PRAG/vs20gravity.webp"
            link="https://example.com"
            title="Gravity Bonanza™"
          />
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
