import { type RequestHandler } from "@builder.io/qwik-city";

// http://localhost:3000/api/playerTransactions?playerName=johndoe&dateStart=2023-01-01&dateEnd=2023-01-31

export interface YodaResponseDataI {
  data: {
    playerTransactions: {
      offset: null;
      count: number;
      playerLines: {
        playerName: string;
        transactionTime: string;
        type: string;
        winLose: string;
        status: string;
      }[];
    };
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
        query: `{playerTransactions(
          first: 20
          playerName: "${playerName}"
          dateStart: "${dateStart}"
          dateEnd: "${dateEnd}"
          providerName: "ADMIN"
        ) {
          offset
          count
          playerLines {
            playerName
            transactionTime
            type
            winLose
            status
          }
        }}`,
      }),
    },
  );

  const body = await queryYoda.json();
  const responseBody = (body as YodaResponseDataI).data.playerTransactions
    ?.playerLines;

  json(200, responseBody);

  //json(200, { hello: "world" });
};
