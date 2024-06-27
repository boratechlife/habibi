import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

//Ensure you include the necessary headers (Authorization, originalip or cf-connecting-ip if applicable) and the request body in JSON format.

export const onPost: RequestHandler = async ({ request, json }) => {
  try {
    // const body = {
    //   amount: Number(data.amount.replace(/[^0-9]/g, "")),
    //   bank: data.bankSelection,
    //   return_url: requestEvent.url.origin,
    //   selectedPromo: false,
    // };
    const body = await request.text();

    // const bodyNew = {
    //   amount: Number(body.amount),
    //   bank: data.bankSelection,
    //   return_url: requestEvent.url.origin,
    //   selectedPromo: false,
    // };
    const authHeader = request.headers.get("authorization");
    console.log("what is body", JSON.parse(body));

    const depositCb = await fetch(process.env.WALLET_URL + "pg/deposit_pg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        "x-clientip": "0.0.0.0",
      },
      body: JSON.stringify(JSON.parse(body)),
    })
      .then(async (res) => await res.json())
      .then((data) => data);

    console.log("what is depositCb", depositCb);
    if (depositCb.err !== 200) throw new Error(depositCb.err_message);
    json(200, {
      success: true,
      ...depositCb,
    });
  } catch (error) {
    console.warn("depositCb Error", error);
    if (error instanceof Error) {
      json(200, {
        success: false,
        err: 500,
        err_message: error?.message,
      });
    } else {
      console.error("An unexpected error occurred", error);
      json(200, {
        success: false,
        err: 500,
        err_message: error,
      });
    }
  }
};
