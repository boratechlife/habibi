// src/components/GamesCard.tsx
import { $, component$, useContext } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LaunchContext } from "~/context/launcherContext";
import { type GameI } from "~/types/Games";

import { transform } from "~/utils/transform";

interface ThumbnailCardProps {
  image: string;
  link: string;
  title: string;
  game: any;
}

export const GameCard = component$<ThumbnailCardProps>(
  ({ image, title, game }) => {
    const launchStore = useContext(LaunchContext);
    const { launchGameAction } = launchStore;
    const location = useLocation();
    const handleOnClick = $(() => {
      console.log("Game", game);
      const gameTransform: GameI = transform(game, game.gType);
      launchGameAction(gameTransform, location.url.pathname);
    });
    return (
      <div class="">
        <div class="relative w-full overflow-hidden rounded-full">
          <div>
            <img
              src={image}
              onClick$={handleOnClick}
              alt={title}
              class="aspect-square max-h-min w-full rounded-t-md md:w-40 lg:w-full"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div
          class="white-space-collapse inline-block h-fit w-full overflow-hidden text-ellipsis rounded-b border-0 bg-[linear-gradient(#065d4d,#08b07c)] p-[5px] text-center text-[3.9vw] text-white"
          style="white-space: nowrap;"
        >
          <span>{title}</span>
        </div>
      </div>
    );
  },
);
