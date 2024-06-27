import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};
export const onPost: RequestHandler = async ({ request, json }) => {
  const headers = new Headers();
  const body = JSON.parse(await request.text());
  console.log("body", body);
  headers.append("Content-Type", "application/json");

  if (process.env.NEXT_PUBLIC_MAIN_PARENT) {
    headers.append("x-org", process.env.NEXT_PUBLIC_MAIN_PARENT);
  }

  try {
    const resetPasswordCb: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/resetPassword`,
      {
        method: "POST",
        headers: headers,
        body: body,
      },
    );

    const resetPasswordBody = await resetPasswordCb.json();

    console.log("re", resetPasswordBody);
    json(200, resetPasswordBody);
  } catch (error: any) {
    console.log(
      "error",
      process.env.NEXT_PUBLIC_MAIN_PARENT,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/resetPassword`,
    );
    json(500, { message: error });
  }

  // json(200, { hello: "world" });
};
