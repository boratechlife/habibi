import { type RequestHandler } from "@builder.io/qwik-city";

export const onPost: RequestHandler = async ({ request, json }) => {
  const data = await request.json();
  const authHeader = request.headers.get("authorization");

  try {
    console.log("`${authHeader}`", `${authHeader}`);
    const withdrawCb = await fetch(
      process.env.WALLET_URL + "/admin/user/withdraw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authHeader}`,
        },
        body: JSON.stringify({
          amount: data.amount,
          noBSC: true,
          payWithPg: Boolean(data.payWithPg),
        }),
      },
    )
      .then(async (res) => res.json())
      .then((data) => data);
    console.log("what is withdrawCb", withdrawCb);
    json(200, {
      success: true,
      ...withdrawCb,
    });
  } catch (error) {
    console.warn("withdrawCb Error", error);
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

  // try {
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");

  //   const authHeader = request.headers.get("authorization");
  //   if (authHeader) {
  //     headers.append("Authorization", authHeader);
  //   }

  //   const body = await request.text();

  //   console.log("wallet", process.env.WALLET_URL);
  //   const withdrawCb = await fetch(
  //     `${process.env.WALLET_URL}admin/user/withdraw`,
  //     {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(body),
  //     },
  //   );

  //   const withdrawBody = await withdrawCb.json();
  //   if (withdrawBody.err === 500) {
  //     throw withdrawBody;
  //   }

  //   json(200, withdrawBody);
  // } catch (error: any) {
  //   json(500, { message: error.message || error });
  // }
};
