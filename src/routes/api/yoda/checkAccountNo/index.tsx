import { type RequestHandler } from "@builder.io/qwik-city";

export interface YodaResponseDataI {
  data: {
    checkuserByAttr: Boolean;
  };
}

export const onGet: RequestHandler = async ({ request, json }) => {
  const url = new URL(request.url);
  const accountNo = url.searchParams.get("accountNo");

  const queryYoda: Response = await fetch(
    process.env.PUBLIC_GRAPHQL_URL || "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{checkuserByAttr(agentName:"${process.env.NEXT_PUBLIC_MAIN_PARENT}",
        accountNo:"${accountNo ?? "0"}"){exist}}`,
      }),
    },
  );

  const body = await queryYoda.json();
  const responseBody = (body as YodaResponseDataI).data.checkuserByAttr;

  json(200, { responseBody });
};
