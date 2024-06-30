import { component$ } from "@builder.io/qwik";

import { CarouselAbsolute } from "~/components/Sliders/CarouselAbsolute";

const App = component$(() => {
  return (
    <div class="app">
      <h1>Qwik Carousel</h1>
      {/* <Carousel slides={slides} autoPlay={true} interval={5000} /> */}
      <CarouselAbsolute />
    </div>
  );
});

export default App;
