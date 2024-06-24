import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

//Ensure you include the necessary headers (Authorization, originalip or cf-connecting-ip if applicable) and the request body in JSON format.

export const onGet: RequestHandler = async ({ request, json }) => {
  json(200, { message: "Hello wordd" });
};
