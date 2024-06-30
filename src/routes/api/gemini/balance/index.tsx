import { type RequestHandler } from "@builder.io/qwik-city";

//testertobrut
// Abcd1234

export const onGet: RequestHandler = async ({ request, json }) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const authHeader = request.headers.get("authorization");

    console.log("Authorization", authHeader);
    if (authHeader) {
      headers.append("Authorization", authHeader);
    }

    const balanceCb: Response = await fetch(
      `${process.env.PUBLIC_BACKEND_URL}user/balance`,
      {
        method: "GET",
        headers,
      },
    );
    const balanceBody = await balanceCb.json();

    if (balanceBody.err === 500) {
      throw new Error("Failed to retrieve balance");
    }

    json(200, balanceBody);
  } catch (error: unknown) {
    json(500, { message: (error as Error).message });
  }
};
