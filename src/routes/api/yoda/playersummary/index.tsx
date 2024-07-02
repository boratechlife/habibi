import { type RequestHandler } from "@builder.io/qwik-city";

export interface YodaResponseDataI {
  data: {
    pbs: {
      date: string;
      validTurnover: string;
      playerWinLoss: string;
    }[];
  };
}

export const onGet: RequestHandler = async ({ request, json }) => {
  const url = new URL(request.url);
  const playerName = url.searchParams.get("playerName");
  const dateStart = url.searchParams.get("dateStart");
  const dateEnd = url.searchParams.get("dateEnd");

  const queryYoda: Response = await fetch(
    process.env.PUBLIC_GRAPHQL_URL || "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{pbs(
          playerName: "${playerName}"
          dateStart: "${dateStart}"
          dateEnd: "${dateEnd}"
        ) {
          date
          validTurnover
          playerWinLoss
        }}`,
      }),
    },
  );

  const body = await queryYoda.json();
  const responseBody = (body as YodaResponseDataI).data.pbs;

  json(200, responseBody);

  //json(200, { hello: "world" });
};
