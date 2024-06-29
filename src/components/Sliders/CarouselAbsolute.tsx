import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";

import styles from "./absolute.css?inline";

export const CarouselAbsolute = component$(() => {
  useStylesScoped$(styles);
  const state = useStore({
    slides: [
      { id: "s1", content: "1", color: "cornflowerblue" },
      { id: "s2", content: "2", color: "bisque" },
      { id: "s3", content: "3", color: "coral" },
      { id: "s4", content: "4", color: "thistle" },
      { id: "s5", content: "5", color: "blueViolet" },
      { id: "s6", content: "6", color: "darkGreen" },
    ],
    currentSlideIndex: 0,
  });

  const carouselRef = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    if (carouselRef.value) {
      const htmls = [...carouselRef.value.children].map((element, index) => {
        element.classList.add("absolute");
        element.classList.add("top-0");
        element.classList.add("bottom-0");
        (element as HTMLElement).style.left =
          `${element.clientWidth * (index + 1)}`;

        console.log("inde", index, element);
        return element;
      });

      carouselRef.value.children = htmls as HTMLCollection;
      console.log("Nodes", htmls);
    }
  });
  return (
    <div class="carousel  relative  w-full *:w-full" ref={carouselRef}>
      <div class="slide">1</div>
      <div class="slide">2</div>
      <div class="slide">3</div>
      <div class="slide">4</div>
      <div class="slide">5</div>
    </div>
  );
});
