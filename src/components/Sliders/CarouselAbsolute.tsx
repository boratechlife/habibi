import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./absolute.css?inline";

export const CarouselAbsolute = component$(() => {
  useStylesScoped$(styles);

  const carouselRef = useSignal<HTMLElement>();

  // useVisibleTask$(() => {
  //   if (carouselRef.value) {
  //     const htmls = [...carouselRef.value.children].map((element, index) => {
  //       element.classList.add("absolute");
  //       element.classList.add("top-0");
  //       element.classList.add("bottom-0");
  //       (element as HTMLElement).style.left =
  //         `${element.clientWidth * (index + 1)}`;

  //       console.log("inde", index, element);
  //       return element;
  //     });

  //     carouselRef.value.children = htmls as HTMLCollection;
  //     console.log("Nodes", htmls);
  //   }
  // });
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
