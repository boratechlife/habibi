import { $, type ClassList, component$, type QRL } from "@builder.io/qwik";
import {
  Image,
  type ImageTransformerProps,
  useImageProvider,
} from "qwik-image";

interface ImageProps {
  src: string;
  alt: string;
  class?: ClassList;
  onClick?: QRL<(e: Event) => void>;
}

export default component$<ImageProps>((props) => {
  const imageTransformer$ = $(({ src }: ImageTransformerProps): string => {
    // Here you can set your favorite image loaders service
    //   return `https://cdn.builder.io/api/v1/${src}?height=${height}&width=${width}&format=webp&fit=fill`;
    return src;
  });

  // Global Provider (required)
  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [640],
    imageTransformer$,
  });

  return (
    <Image
      loading="lazy"
      layout="constrained"
      objectFit="fill"
      width={200}
      height={200}
      alt="Tropical paradise"
      placeholder="#e6e6e6"
      class={props.class}
      src={props.src}
      onClick$={props.onClick}
    />
  );
});
