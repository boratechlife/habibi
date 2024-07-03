import { type GameI } from "~/types/Games";

export const transform = (game: GameI, gType: number): GameI => {
  let imageUrl = `${import.meta.env.PUBLIC_ASSETS}/images${game.image}`;
  if (!game.image.includes("/thumbnail/")) {
    imageUrl = game.image;
  }

  return {
    provider: game.provider,
    id: game.mType,
    name: game.name,
    nameth: game.nameth,
    categoryIds: Number(gType) === 99 ? 0 : Number(gType),
    image: imageUrl,
    isShow: game.isShow,
    isNew: game.isNew || false,
    DateAdd: game.DateAdd,
    isRecommend: game.isRecommend || false,
    wide: game?.wide || false,
    // description: game.description || "No description",
    promos: game?.promos || [],
    rtp: game.rtp || 0,
    gType: game.gType,
    mType: game.mType,
    category: `${game.gType}`,
    providerIdx: game.providerIdx,
    dateAdd: game.dateAdd,
  };
};
