import { type RequestHandler } from "@builder.io/qwik-city";

type ResponseData = {
  message: string;
};

//testertobrut
// Abcd1234

export const onPost: RequestHandler = async ({ request, json }) => {
  const textBody = await request.text();
  const body = {
    ...JSON.parse(textBody),
    password_confirm: JSON.parse(textBody).password,
    agentName: process.env.NEXT_PUBLIC_MAIN_PARENT,
    currency: process.env.REGISTER_CURRENCY,
    firstName: "-",
    lastName: "-",
    status: process.env.REGISTER_STATUS,
    tableLimit: process.env.REGISTER_TABLE_LIMIT,
  };

  // const readableStream = request.request.body;

  console.log("request.json()", body);

  try {
    const registerCb: Response = await fetch(
      `${process.env.PUBLIC_BACKEND_URL}user/v2/insert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const registerBody = await registerCb.json();

    if (registerBody.err === 500) {
      throw registerBody;
    }

    if (
      registerBody.err === undefined &&
      registerBody.agentName !== process.env.NEXT_PUBLIC_MAIN_PARENT
    ) {
      throw {
        err: 500,
        err_message: "You are not allowed to access from this site",
      };
    }

    json(200, registerBody);
  } catch (error: any) {
    json(500, error);
  }
};
