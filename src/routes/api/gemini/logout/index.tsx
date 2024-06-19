import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const authHeader = request.headers.get("authorization");

    console.log("Authorization", authHeader);
    if (authHeader) {
      headers.append("Authorization", authHeader);
    }

    console.log("Auuth header", authHeader);

    const logoutCb: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/logout`,
      {
        method: "POST",
        headers,
      },
    );

    const logoutBody = await logoutCb.json();

    if (logoutBody.err === 500) {
      throw logoutBody;
    }

    json(200, logoutBody);
  } catch (error: any) {
    json(500, error);
  }
};
