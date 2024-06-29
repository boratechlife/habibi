import {
  component$,
  useStylesScoped$,
  useSignal,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";

interface CarouselProps {
  slides?: string[];
  autoPlay?: boolean;
  interval?: number;
}

export default component$<CarouselProps>(
  ({ slides, autoPlay = false, interval = 3000 }) => {
    useStylesScoped$(`
        .slider-wrapper .image-list {
         display:grid;
         overflow:scroll;
         scrollbar-width:none;
         gap:18px;
         grid-template-columns:repeat(10, 400px)
        }
         .slider-wrapper .image-list .image-item {
         width:400px;
         height:400px;
         object-fit:cover;
         margin-bottom:10px;
         }
     .image-list::-webkit-scrollbar {
     display:none
     }

     .slider-scrollbar {

      height:24px;
      width:100%;
     
      display:flex;
      align-items:center
     }
     .slider-scrollbar .scrollbar-track {
     height:2px;
     width:100%;
     position:relative;
     background:#ccc;
     border-radius:4px;
     }
          .slider-scrollbar:hover .scrollbar-thumb {
     height:4px;

     }
     .scrollbar-thumb {
     height:2px;
     position:absolute;
     width:50%;
     background:#000;
     border-radius:inherit;
     cursor:grab;
     }

     .scrollbar-thumb:active {
     cursor:grabbing;
     height:8px;
     top:-2px;
     }
     .scrollbar-thumb:after {
     position:absolute;
     content:"",
     left:0;
     right:0;
     top:-10px;
     bottom:-10px;
     }
      `);
    const ImageList = useSignal<HTMLElement>();
    const prevButton = useSignal<HTMLButtonElement>();
    const nextButton = useSignal<HTMLButtonElement>();

    const maxScroll = useSignal<number>(0);
    useVisibleTask$(() => {
      if (ImageList.value) {
        maxScroll.value =
          ImageList.value?.scrollWidth - ImageList.value.clientWidth;
      }
    });

    const handleOnClick = $((e: Event) => {
      console.log("EVENT", (e.target as HTMLElement).id);
      const direction =
        e.target && (e.target as HTMLElement).id === "prev-button" ? -1 : 1;

      if (ImageList.value) {
        const scrollAmount = ImageList.value?.clientWidth * direction;
        ImageList.value.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
        console.log(
          "scrollAmount",
          ImageList.value.scrollLeft,
          maxScroll.value,
        );

        if (ImageList.value.scrollLeft >= maxScroll.value && nextButton.value) {
          nextButton.value.disabled = true;
        } else {
          if (nextButton.value) {
            nextButton.value.disabled = false;
          }
        }

        if (ImageList.value.scrollLeft <= 0 && prevButton.value) {
          prevButton.value.disabled = true;
        } else {
          if (prevButton.value) {
            prevButton.value.disabled = false;
          }
        }
      }
    });
    return (
      <>
        <section class="containr w-full">
          <div class="slider-wrapper relative w-full">
            <button
              id="prev-button"
              ref={prevButton}
              class="absolute left-0 top-1/2 -translate-y-1/2 rounded border bg-white p-4 disabled:opacity-70"
              onClick$={handleOnClick}
            >
              Prev
            </button>
            <button
              id="next-button"
              ref={nextButton}
              class="absolute right-0 top-1/2 -translate-y-1/2 rounded border bg-white p-4 disabled:opacity-50"
              onClick$={handleOnClick}
            >
              Next
            </button>

            <div class="image-list *:w-[400px]" ref={ImageList}>
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 1"
                class="image-item"
                width={325}
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 2"
                class="image-item"
                width={325}
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 3"
                class="image-item"
                width={325}
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 4"
                class="image-item"
                width={325}
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 5"
                class="image-item"
              />

              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 2"
                class="image-item"
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 3"
                class="image-item"
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 4"
                class="image-item"
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 5"
                class="image-item"
              />
              <img
                src="/img/free-photo-of-off-road-expedition-through-the-desert.jpeg"
                alt="img 5"
                class="image-item"
              />
            </div>

            <div class="slider-scrollbar">
              <div class="scrollbar-track">
                <div class="scrollbar-thumb"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  },
);
