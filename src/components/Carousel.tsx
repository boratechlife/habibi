import {
  component$,
  useStylesScoped$,
  useSignal,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";

interface CarouselProps {
  slides: string[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel = component$<CarouselProps>(
  ({ slides, autoPlay = false, interval = 3000 }) => {
    useStylesScoped$(`
          .carousel {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          .carousel-track {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }
          .carousel-slide {
            min-width: 100%;
            box-sizing: border-box;
          }
          .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            cursor: pointer;
            z-index: 10;
          }
          .carousel-button.prev {
            left: 10px;
          }
          .carousel-button.next {
            right: 10px;
          }
        `);

    // Start from the first actual slide (index 1)
    const currentIndex = useSignal(0);
    // Reference to the carousel track
    const trackRef = useSignal<HTMLDivElement>(null);

    // Duplicate slides to create the seamless effect
    const totalSlides = slides.length;
    const extendedSlides = useSignal([...slides, ...slides]);

    // Function to update the slides array when needed
    const updateSlides = $(() => {
      const currentSlides = extendedSlides.value;

      if (currentIndex.value > 0) {
        currentSlides.push(currentSlides[currentIndex.value - 1]);
        extendedSlides.value = [...currentSlides];
      } else {
        currentSlides.push(currentSlides[currentIndex.value]);
      }

      //   if (extendedSlides.value.length > 20) {
      //     currentSlides.shift();
      //     extendedSlides.value = [...currentSlides];
      //     currentIndex.value--;
      //   }

      console.log("extendedSlides.value", extendedSlides.value);
      //   if (currentIndex.value >= totalSlides * 2) {
      //     currentSlides.push(currentSlides[currentIndex.value - totalSlides]);
      //     extendedSlides.value = [...currentSlides];
      //     console.log("extendedSlides.value", extendedSlides.value);
      //     currentIndex.value++;
      //   } else if (currentIndex.value <= 0) {
      //     currentSlides.unshift(currentSlides[totalSlides + currentIndex.value]);
      //     extendedSlides.value = [...currentSlides];
      //     console.log("extendedSlides.value 0", extendedSlides.value);
      //     currentIndex.value++;
      //   }
    });

    // Function to reset the track position without animation
    const resetTrack = $(() => {
      if (trackRef.value) {
        trackRef.value.style.transition = "none";
        trackRef.value.style.transform = `translateX(-${totalSlides * 100}%)`;
        setTimeout(() => {
          if (trackRef.value) {
            trackRef.value.style.transition = "transform 0.5s ease-in-out";
          }
        }, 50);
      }
    });

    // Move to the next slide
    const nextSlide = $(() => {
      if (currentIndex.value >= extendedSlides.value.length - 1) {
        // currentIndex.value = totalSlides;
        // resetTrack();
      } else {
        currentIndex.value = currentIndex.value + 1;
      }
      updateSlides();
    });

    // Move to the previous slide
    const prevSlide = $(() => {
      if (currentIndex.value <= 0) {
        currentIndex.value = totalSlides - 1;
        // resetTrack();
      } else {
        currentIndex.value = currentIndex.value - 1;
      }
      updateSlides();
    });

    // Auto play functionality
    useVisibleTask$(() => {
      if (autoPlay) {
        const timer = setInterval(() => {
          nextSlide();
        }, interval);
        return () => clearInterval(timer);
      }
    });

    return (
      <div class="carousel">
        <div
          class="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex.value * 100}%)` }}
        >
          {extendedSlides.value.map((slide, index) => (
            <div class="carousel-slide" key={index}>
              <img src={slide} alt={`Slide ${index + 1}`} class="w-full" />
            </div>
          ))}
        </div>
        <button class="carousel-button prev" onClick$={prevSlide}>
          ‹
        </button>
        <button class="carousel-button next" onClick$={nextSlide}>
          ›
        </button>
      </div>
    );
  },
);

export default Carousel;
