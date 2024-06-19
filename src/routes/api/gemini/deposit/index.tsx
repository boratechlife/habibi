import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

//Ensure you include the necessary headers (Authorization, originalip or cf-connecting-ip if applicable) and the request body in JSON format.

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers.append("Authorization", authHeader);
    }
    const body = await request.text();

    // Determine client IP address
    let ipAddress =
      request.headers["originalip"] || request.headers["cf-connecting-ip"];
    headers.append(
      "x-clientip",
      Array.isArray(ipAddress)
        ? ipAddress[0]
        : typeof ipAddress === "string"
          ? ipAddress
          : "127.0.0.1",
    );

    console.log("body", ipAddress);
    const depositCb: Response = await fetch(
      `${process.env.WALLET_URL}pg/deposit_pg`,
      {
        method: "POST",
        headers,
        body: body, // Assuming Qwik automatically parses request body
      },
    );

    const depositBody = await depositCb.json();

    if (depositBody.err === 500) {
      console.log("deposite-body", depositBody);
      throw depositBody;
    }

    json(200, depositBody);

    //json(200, { hello: "world" });
  } catch (error: any) {
    console.log("error", error);
    json(500, error);
  }
};
