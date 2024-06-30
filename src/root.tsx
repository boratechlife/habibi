import { component$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

import RouterHead from "~/components/common/Head";

// import the Flowbite module
import { initFlowbite } from "flowbite";

import "./global.css";

export default component$(() => {
  // initialise the event listeners for the data attributes on render

  useTask$(() => {
    if (isServer) {
      return;
    }
    initFlowbite();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en" class="bg-sky-900">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
