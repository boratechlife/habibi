import { component$ } from "@builder.io/qwik";

export const LoaderPage = component$(() => {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div class="flex flex-col items-center">
        <div class="relative w-24 h-24">
          <div class="absolute w-full h-full border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full spin"></div>
        </div>
        <div class="mt-4 flex space-x-4">
          <div class="w-4 h-4 bg-blue-500 rounded-full bounce"></div>
          <div
            class="w-4 h-4 bg-blue-500 rounded-full bounce"
            style="animation-delay: 0.2s;"
          ></div>
          <div
            class="w-4 h-4 bg-blue-500 rounded-full bounce"
            style="animation-delay: 0.4s;"
          ></div>
        </div>
        <p class="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
});

// import { component$ } from "@builder.io/qwik";

// export const LoaderPage = component$(() => {
//   return (
//     <div class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
//       <div class="relative w-24 h-24">
//         <div class="absolute w-full h-full flex justify-center items-center">
//           <div class="w-16 h-16 bg-black rounded-full"></div>
//         </div>
//         <div class="absolute w-full h-full flex justify-center items-center">
//           <div class="w-3 h-3 bg-yellow-500 rounded-full spin"></div>
//         </div>
//         <div class="absolute w-full h-full border-8 border-yellow-500 rounded-full spin-reverse"></div>
//       </div>
//       <p class="mt-4 text-gray-500">Loading...</p>
//     </div>
//   );
// });
