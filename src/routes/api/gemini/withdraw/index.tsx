import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers.append("Authorization", authHeader);
    }

    const body = await request.text();

    console.log("wallet", process.env.WALLET_URL);
    const withdrawCb = await fetch(
      `${process.env.WALLET_URL}admin/user/withdraw`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      },
    );

    const withdrawBody = await withdrawCb.json();
    if (withdrawBody.err === 500) {
      throw withdrawBody;
    }

    json(200, withdrawBody);
  } catch (error: any) {
    json(500, { message: error.message || error });
  }
};
