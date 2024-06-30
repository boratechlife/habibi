import { type RequestHandler } from "@builder.io/qwik-city";

//Ensure you include the necessary headers (Authorization, originalip or cf-connecting-ip if applicable) and the request body in JSON format.

export const onGet: RequestHandler = async ({ json }) => {
  json(200, { message: "Hello wordd" });
};
