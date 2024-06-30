import { type RequestHandler } from "@builder.io/qwik-city";

export type GetPasaranResponseI = {
  pasaran_id: number;
  opened_at: any;
  agent_id: string;
  pasaran_name: string;
  pasaran_shortname: string;
  pasaran_sourcedata_id: number;
  open_day: boolean[];
  daily_closetime: string;
  daily_drawtime: string;
  display_order: any;
  is_shown: boolean;
  status_now: any;
  episode: number;
  next_closetime: any;
  pasaran_active: boolean;
  comment: any;
  recent_results: {
    draw_date: string;
    result: string;
    episode: number;
  }[];
  agents: string[];
};

export const onGet: RequestHandler = async ({ json }) => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");

  try {
    const response = await fetch(
      "https://api.wirosablengonline.com/dora/pasaran-agent/" +
        process.env.NEXT_PUBLIC_MAIN_PARENT,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      },
    ).then((response) => response.json());

    json(200, response);
  } catch (error) {
    console.error("Error fetching pasaran data:", error);
  }
};
