import { component$, useStore, useTask$, useWatch$ } from "@builder.io/qwik"; // Define interfaces
interface Popup {
  callToAction_url: string;
  callToAction_label: string;
  imagealt: string;
  imageurl: string;
  isShow: boolean;
}

interface PromoPage {
  heroImage: string;
  title: string;
  content: string;
  isShow: boolean;
}

interface SeoData {
  description: string;
  footer: string;
  image: string;
  title: string;
}

export interface SeoPageList {
  arcade: SeoData;
  index: SeoData;
  livecasino: SeoData;
  login: SeoData;
  poker: SeoData;
  promo: SeoData;
  register: SeoData;
  slot: SeoData;
  sports: SeoData;
  table: SeoData;
}

interface RunningText {
  text: string;
  index: number;
  isShow: boolean;
}

interface PromoGame {
  id: number;
  description: string;
  promoCode: string;
  promo_meta_data: string;
  meta_data: {
    newMember: boolean;
    minDepo: number;
    maxDeposit: number;
    maxBonus: number;
    maxAllowedUse: number;
    turnoverMultiplier: number;
    bonusMultiplier: number;
    isShow: boolean;
    showAllGames: boolean;
    maxBet: number;
  };
}

export interface SiteInfo {
  banners: Banner[];
  canonical: string;
  footer_livechat: string;
  gtag: string;
  livechat: string;
  popup: Popup[];
  promo: PromoPage[];
  runningText: RunningText[];
  siteLogo: string;
  attributes: {
    banners: Banner[];
    canonical: string;
    footer_livechat: string;
    gtag: string;
    livechat: string;
    popup: Popup[];
    promo: PromoPage[];
    runningText: RunningText[];
    siteLogo: string;
  };
  SEO: SeoPageList;
  contacts: {
    line: string;
    telegram: string;
    whatsapp: string;
  };
  promos: PromoGame[];
}

export interface SeoInterface {
  siteStatus: SiteStatus;
  siteInfo: SiteInfo;
}

interface SiteStatus {
  isMaintenanceMode: boolean;
  livechat: string;
}

interface Banner {
  index: number;
  imagealt: string;
  imageurl: string;
  isShow: boolean;
}

export interface TransformedListI {
  provider: string;
  id: string;
  name: string;
  nameth: string;
  categoryIds: number;
  image: string;
  isShow: boolean;
  isNew: boolean;
  dateAdd: number;
  isRecommend: boolean;
  poster: string;
  wide: boolean;
  description: string;
  promos: any[];
  rtp: number;
}

interface ListI {
  category: string;
  DateAdd: number;
  gType: number;
  image: string;
  isNew: boolean;
  isRecommend: boolean;
  isShow: boolean;
  mType: string;
  name: string;
  nameth: string;
  poster: string;
  provider: string;
  description: string;
  rtp?: number;
  wide: boolean;
  promos: any[];
}
export interface GamesI {
  "0": GameI;
  "1": GameI;
  "7": GameI;
  "9": GameI;
  "12": GameI;
  "60": GameI;
  "70": GameI;
  "80": GameI;
  "99": GameI;
}

interface GameI {
  gType: number;
  isShow: boolean;
  list: ListI[] | [];
  name: string;
}

export type TabName = "0" | "1" | "7" | "9" | "12" | "60" | "70" | "80" | "99";

const transform = (game: ListI, gType: Number): TransformedListI | Object => {
  if (!game.isShow) {
    return {};
  }
  let imageUrl = `${process.env.PUBLIC_IMAGE_URL}${game.image}`;
  if (!game.image.includes("/thumbnail/")) {
    imageUrl = game.image;
  }
  if (game.provider === "haba") {
    imageUrl = `${process.env.PUBLIC_IMAGE_URL}${game.image}.png`;
  }
  return {
    provider: game.provider,
    id: game.mType,
    name: game.name,
    nameth: game.nameth,
    categoryIds: Number(gType) === 99 ? 0 : Number(gType),
    image: imageUrl,
    isShow: game.isShow || false,
    isNew: game.isNew || false,
    dateAdd: game.DateAdd,
    isRecommend: game.isRecommend || false,
    poster: game.poster,
    wide: game.wide || false,
    description: game.description || "No description",
    promos: game.promos || [],
    rtp: game.rtp || 0,
  };
};

export const store = {
  allGames: [] as TransformedListI[],
  selectedGames: {} as GamesI,
  rawGames: {} as GamesI,
  filteredGames: [] as TransformedListI[],
  providers: [] as string[],
  heroImages: [] as Banner[],
  siteInfo: {
    banners: [],
    canonical: "",
    footer_livechat: "",
    gtag: "",
    livechat: "",
    popup: [],
    promo: [],
    runningText: [],
    siteLogo: "",
    attributes: {
      banners: [],
      canonical: "",
      footer_livechat: "",
      gtag: "",
      livechat: "",
      popup: [],
      promo: [],
      runningText: [],
      siteLogo: "",
    },
    SEO: {
      arcade: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      index: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      livecasino: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      login: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      poker: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      promo: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      register: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      slot: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      sports: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
      table: {
        description: "",
        footer: "",
        image: "",
        title: "",
      },
    },
    contacts: {
      line: "",
      telegram: "",
      whatsapp: "",
    },
    promos: [],
  } as SiteInfo,
  siteStatus: { isMaintenanceMode: false, livechat: "" } as SiteStatus,
  seo: {
    arcade: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    index: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    livecasino: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    login: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    poker: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    promo: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    register: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    slot: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    sports: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
    table: {
      description: "",
      footer: "",
      image: "",
      title: "",
    },
  } as SeoPageList,
  canonical: "",
};

export const setSiteInfo = (seo: SeoInterface) => {
  store.siteInfo = { ...seo.siteInfo };
  store.seo = seo.siteInfo.SEO;
  store.heroImages = seo.siteInfo.banners.filter((image) => image.isShow);
  store.canonical = seo.siteInfo.canonical;
  store.siteStatus = seo.siteStatus;
  if (seo.siteStatus.isMaintenanceMode) {
    alert("Website is in maintenance mode");
  }
};

export const getSiteInfo = (): SiteInfo => store.siteInfo;

export const setSiteGames = (games: GamesI) => {
  const g = games;
  const _games: TransformedListI[] = [];
  Object.keys(g).forEach((gType) => {
    g[gType as TabName].list.forEach((g) => {
      const gameItem: TransformedListI | Object = transform(g, Number(gType));
      if (Object.keys(g).includes("gType")) {
        _games.push(gameItem as TransformedListI);
      }
    });
  });
  store.rawGames = g;
  store.allGames = _games;
};

export const getPopularGames = (): TransformedListI[] => {
  return store.allGames
    .reduce<TransformedListI[]>((rv, g) => {
      if (g.isRecommend && g.isShow) {
        rv.push(g);
      }
      return rv;
    }, [])
    .sort((a: TransformedListI, b: TransformedListI) => {
      if (a.wide && !b.wide) {
        return -1; // a is wide, b is not wide
      } else if (!a.wide && b.wide) {
        return 1; // b is wide, a is not wide
      } else {
        // both are wide or both are not wide, sort by dateAdd
        return b.dateAdd - a.dateAdd;
      }
    });
};

export const getPromoGames = () => {
  const promos: Record<string, any> = {};
  for (const gameObj of store.allGames) {
    if (gameObj.isShow && gameObj.promos && gameObj.promos.length > 0) {
      for (const promo of gameObj.promos) {
        if (
          store.siteInfo.promos.some(
            (act_promo) => act_promo.promoCode === promo,
          )
        ) {
          if (!promos[promo]) {
            promos[promo] = [gameObj];
          } else {
            promos[promo] = [...promos[promo], gameObj];
          }
        }
      }
    }
  }
  return promos;
};

export const getImageUrls = () => store.siteInfo.popup.filter((i) => i.isShow);

export const getGamesBasedOnCategory = (
  categoryId: string,
): TransformedListI[] => {
  const filteredGames =
    categoryId === "999"
      ? store.allGames.filter((g) => g.isRecommend)
      : store.allGames.filter((g) => g.categoryIds == Number(categoryId));
  const providers = Array.from(new Set(filteredGames.map((g) => g.provider)));
  store.filteredGames = filteredGames;
  store.providers = providers;
  return filteredGames;
};

export const getSeoData = () => store.seo;
// Qwik component
