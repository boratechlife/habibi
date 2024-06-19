import { type RequestHandler } from "@builder.io/qwik-city";
import { GamesI, SeoInterface } from "~/interfaces";
import { decompressString } from "~/utils/decompress";

export const onGet: RequestHandler = async ({ json }) => {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS || "";
  const parent = process.env.NEXT_PUBLIC_MAIN_PARENT || "";

  const siteInfoResponse = await fetch(`${assetsUrl}${parent}-sites.json`);
  const siteInfoText = await siteInfoResponse.text();
  const siteGamesResponse = await fetch(`${assetsUrl}${parent}-games.json`);
  const siteGamesText = await siteGamesResponse.text();

  const siteInfo = JSON.parse(siteInfoText) as SeoInterface;
  const siteGames = JSON.parse(siteGamesText);
  const games: GamesI = {};

  for (const catKey of Object.keys(siteGames)) {
    const dataToDecompress = siteGames[catKey].list;
    if (Array.isArray(dataToDecompress)) {
      games[catKey] = {
        ...siteGames[catKey],
        list: dataToDecompress,
      };
    } else {
      console.log("Data to decompress", dataToDecompress);

      const decompressData = await decompressString(dataToDecompress);
      console.log("DECOMPRESSED,", decompressData);
      games[catKey] = {
        ...siteGames[catKey],
        list: decompressData,
      };
    }
  }

  json(200, { SiteInfo: siteInfo, SiteGames: games });

  // json(200, { hello: siteInfo, parent: siteGames });
};
