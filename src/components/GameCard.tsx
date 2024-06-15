// src/components/GamesCard.tsx
import { component$ } from "@builder.io/qwik";

interface ThumbnailCardProps {
  image: string;
  link: string;
  title: string;
}

export const GameCard = component$<ThumbnailCardProps>(
  ({ image, link, title }) => {
    return (
      <div class="">
        <div class="relative w-full overflow-hidden rounded-full">
          <a href={link}>
            <img
              src={image}
              alt={title}
              class="aspect-square max-h-min w-full rounded-t-md md:w-40 lg:w-full"
              loading="lazy"
            />
          </a>
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
