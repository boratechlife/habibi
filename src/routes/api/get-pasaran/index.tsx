import { type RequestHandler } from "@builder.io/qwik-city";
import { GamesI, SeoInterface } from "~/interfaces";
import { decompressString } from "~/utils/decompress";

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
  const fakeResponse: GetPasaranResponseI[] = [
    {
      pasaran_id: 1710152587,
      opened_at: null,
      agent_id: "cronos",
      pasaran_name: "SYDNEY",
      pasaran_shortname: "SYD",
      pasaran_sourcedata_id: 1696673094,
      open_day: [true, true, true, true, true, true, true],
      daily_closetime: "13:30:00",
      daily_drawtime: "13:50:00",
      display_order: null,
      is_shown: false,
      status_now: null,
      episode: 13043,
      next_closetime: null,
      pasaran_active: true,
      comment: null,
      recent_results: [],
      agents: [
        "arctest",
        "buditogel",
        "bimatoto",
        "habibitoto",
        "indrajitu",
        "acong88",
        "armani188",
        "ayambet",
        "burungbet",
        "indoforwin",
        "megaforwin",
        "nagaforwin",
        "nasgor88",
        "plnslot",
        "sateslot",
      ],
    },
    {
      pasaran_id: 1717408466,
      opened_at: null,
      agent_id: "cronos",
      pasaran_name: "JEPANG",
      pasaran_shortname: "JAPAN",
      pasaran_sourcedata_id: 1710152527,
      open_day: [true, true, true, true, true, true, true],
      daily_closetime: "16:50:00",
      daily_drawtime: "17:20:00",
      display_order: null,
      is_shown: false,
      status_now: null,
      episode: 12989,
      next_closetime: 1717494600,
      pasaran_active: false,
      comment: null,
      recent_results: [],
      agents: ["arctest", "buditogel", "bimatoto", "habibitoto", "indrajitu"],
    },
    {
      pasaran_id: 1717408547,
      opened_at: null,
      agent_id: "cronos",
      pasaran_name: "CHINA POOLS",
      pasaran_shortname: "CHINA",
      pasaran_sourcedata_id: 1710152527,
      open_day: [true, true, true, true, true, true, true],
      daily_closetime: "15:15:00",
      daily_drawtime: "15:30:00",
      display_order: null,
      is_shown: false,
      status_now: null,
      episode: 12989,
      next_closetime: 1717488900,
      pasaran_active: false,
      comment: null,
      recent_results: [],
      agents: ["arctest", "buditogel", "bimatoto", "habibitoto", "indrajitu"],
    },
  ];

  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS || "";
  const parent = process.env.NEXT_PUBLIC_MAIN_PARENT || "";
};
