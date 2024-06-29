import { component$ } from "@builder.io/qwik";
import Carousel from "~/components/Carousel";
import { CarouselAbsolute } from "~/components/Sliders/CarouselAbsolute";
import { CarouselSlide } from "~/components/Sliders/CarouselSlide";
import ImageSlider from "~/components/Sliders/ImageSlider";

const App = component$(() => {
  const slides = [
    "https://via.placeholder.com/800x400?text=Slide+1",
    "https://via.placeholder.com/800x400?text=Slide+2",
    "https://via.placeholder.com/800x400?text=Slide+3",
  ];

  return (
    <div class="app">
      <h1>Qwik Carousel</h1>
      {/* <Carousel slides={slides} autoPlay={true} interval={5000} /> */}
      <CarouselAbsolute />
    </div>
  );
});

export default App;
