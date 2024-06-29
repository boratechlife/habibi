import {
  $,
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";

import styles from "./slide.css?inline";

export const CarouselSlide = component$(() => {
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

  const goToSlide = $((slideIndex: number) => {
    state.currentSlideIndex = slideIndex;
    state.slides.forEach((_, i) => {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        slideElement.style.transform = `translateX(${110 * (i - slideIndex)}%)`;
      }
    });
  });

  const readyNextSlide = $(() => {
    if (state.currentSlideIndex === state.slides.length - 2) {
      const [firstSlide, ...restSlides] = state.slides;
      state.slides = [...restSlides, firstSlide];
      state.currentSlideIndex--;
    } else if (state.currentSlideIndex === 0) {
      const lastSlide = state.slides[state.slides.length - 1];
      state.slides = [lastSlide, ...state.slides.slice(0, -1)];
      state.currentSlideIndex++;
    }
  });

  const shiftSlides = $((direction: number) => {
    state.currentSlideIndex += direction;
    if (
      state.currentSlideIndex >= state.slides.length ||
      state.currentSlideIndex < 0
    ) {
      readyNextSlide();
    }
    goToSlide(state.currentSlideIndex);
  });

  useVisibleTask$(() => {
    goToSlide(state.currentSlideIndex);
  });

  return (
    <div class="slider">
      {state.slides.map((slide, index) => (
        <div
          id={`slide-${index}`}
          class="slide"
          style={{ backgroundColor: slide.color }}
          key={slide.id}
        >
          <b>{slide.content}</b>
        </div>
      ))}
      <button class="btn btn-left" onClick$={() => shiftSlides(-1)}>
        &larr;
      </button>
      <button class="btn btn-right" onClick$={() => shiftSlides(1)}>
        &rarr;
      </button>
    </div>
  );
});
