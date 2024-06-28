import type { TransformedListI } from "./site";
import { getToken } from "./auth";
import he from "he";

interface LaunchStore {
  game: TransformedListI;
  showLauncherDialog: boolean;
  showGameWindow: boolean;
  gameLaunchResult: {
    err: number;
    err_message: string;
    url: string;
    html: boolean;
    game: TransformedListI;
  };
  launchGameAction: (game: TransformedListI, path: string) => Promise<void>;
  closeLauncherDialog: () => void;
}

const initialGameState: TransformedListI = {
  provider: "",
  id: "",
  name: "",
  nameth: "",
  categoryIds: 0,
  image: "",
  isShow: false,
  isNew: false,
  dateAdd: 0,
  isRecommend: false,
  poster: "",
  wide: false,
  description: "No description",
  promos: [],
  rtp: 0,
};

// Qwik component

export const store = {
  game: initialGameState,
  showLauncherDialog: false,
  showGameWindow: false,
  gameLaunchResult: {
    err: 200,
    err_message: "",
    url: "",
    html: false,
    game: initialGameState,
  },
  launchGameAction: async (game: TransformedListI, path: string) => {
    console.log("what is path", path);
    if (store.showLauncherDialog) {
      // errorNotification('warning', 'Please close active game');
      console.warn("cannot open other game, while opening another one");
      return;
    }
    store.game = game;

    const si = await fetch("/api/site-info", {
      method: "GET",
    }).then((res) => res.json());

    if (si.siteStatus?.isMaintenanceMode) {
      store.showLauncherDialog = false;
      // errorNotification('warning', 'SITE UNDER MAINTENANCE');
      return;
    }

    const launchCb = await fetch(
      process.env.PUBLIC_BACKEND_URL + "launchgame",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...game,
          return_url: window.location.href,
          lang: "id",
          isAppMobile: /Mobi/.test(window.navigator.userAgent),
        }),
      },
    ).then((res) => res.json());

    store.showLauncherDialog = true;

    if (launchCb.err === 403 || launchCb.err === 500) {
      store.closeLauncherDialog();
      return;
    }

    if (launchCb.html) {
      store.gameLaunchResult = {
        err: launchCb.err || 200,
        err_message: launchCb.err_message,
        url: he.decode(launchCb.data),
        html: true,
        game,
      };
    } else {
      store.gameLaunchResult = {
        err: launchCb.err || 200,
        err_message: launchCb.err_message,
        url: launchCb.url,
        html: false,
        game,
      };
    }
  },
  closeLauncherDialog: () => {
    store.game = initialGameState;
    store.showLauncherDialog = false;
    store.showGameWindow = false;
  },
};
