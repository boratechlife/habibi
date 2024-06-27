import { RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async ({ request, json }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (process.env.NEXT_PUBLIC_MAIN_PARENT) {
    headers.append("x-org", process.env.NEXT_PUBLIC_MAIN_PARENT);
  }

  let ipAddress =
    request.headers.get("originalip") ||
    request.headers.get("cf-connecting-ip");

  headers.append(
    "x-clientip",
    Array.isArray(ipAddress)
      ? ipAddress[0]
      : typeof ipAddress === "string"
        ? ipAddress
        : "127.0.0.1",
  );

  try {
    const requestBody = await request.json();
    console.log("requestBody", requestBody);
    console.log("URL", `${process.env.NEXT_PUBLIC_BACKEND_URL}user/login`);

    const loginCb: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/login`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody), // Converting request body to JSON string
        duplex: "half", // Adding duplex option to handle body streaming
      },
    );

    if (!loginCb.ok) {
      throw new Error(`Error: ${loginCb.status} ${loginCb.statusText}`);
    }

    const loginBody = await loginCb.json();
    console.log("headers", loginBody);
    json(200, { loginBody });
  } catch (error) {
    console.error("Error during login request:", error);
    json(500, { err: "An error occurred during the login process." });
  }
};
