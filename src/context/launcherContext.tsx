// launcherContext.ts
import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useStore,
  $,
  type QRL,
} from "@builder.io/qwik";
import { AuthContext } from "./auth-context";
import he from "he";
import { SiteDataContext } from "~/routes/layout";

interface TransformedListI {
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

interface LaunchStore {
  game: TransformedListI;
  // showLauncherDialog: boolean;
  showGameWindow: boolean;
  gameLaunchResult: {
    err: number;
    err_message: string;
    url: string;
    html: boolean;
    game: TransformedListI;
  };
  launchGameAction: QRL<(game: any, path: string) => void>;
  closeLauncherDialog: QRL<() => void>;
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

export const LaunchContext = createContextId<LaunchStore>("launch-context");

export const LaunchProvider = component$(() => {
  const auth = useContext(AuthContext);
  const SiteInfo = useContext(SiteDataContext);
  const launchStore = useStore({
    game: initialGameState,
    // showLauncherDialog: false,
    showGameWindow: false,
    gameLaunchResult: {
      err: 200,
      err_message: "",
      url: "",
      html: false,
      game: initialGameState,
    },
  });

  const closeLauncherDialog = $(() => {
    launchStore.game = initialGameState;
    // launchStore.showLauncherDialog = false;
    launchStore.showGameWindow = false;
  });

  const launchGameAction = $(async (game: TransformedListI, path: string) => {
    console.log("what is path", path);
    // if (launchStore.showLauncherDialog) {
    //   console.warn("cannot open other game, while opening another one");
    //   return;
    // }
    launchStore.game = game;
    //TODO
    const si: any = SiteInfo.value.siteInfo;
    if (si.siteStatus?.isMaintenanceMode) {
      // launchStore.showLauncherDialog = false;
      return;
    }
    const launchCb: any = await fetch(
      import.meta.env.PUBLIC_BACKEND_URL + "launchgame",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...game,
          return_url: window.location.href,
          lang: "id",
          isAppMobile: /Mobi/.test(window.navigator.userAgent),
        }),
      },
    ).then((r) => r.json());

    // launchStore.showLauncherDialog = true;
    console.log("launchCb token", launchCb);
    if (launchCb.err === 403 || launchCb.err === 500) {
      closeLauncherDialog();
      return;
    }

    if (launchCb.html) {
      const pgs_window = window.open("about:blank", "PGS", "_parent");
      pgs_window?.focus();
      pgs_window?.document.open();
      pgs_window?.document.write(he.decode(launchCb.data));
      pgs_window?.document.close();
      launchStore.gameLaunchResult = {
        err: launchCb.err || 200,
        err_message: launchCb.err_message,
        url: he.decode(launchCb.data),
        html: true,
        game,
      };
    } else {
      window.location.href = launchCb.url;
      launchStore.gameLaunchResult = {
        err: launchCb.err || 200,
        err_message: launchCb.err_message,
        url: launchCb.url,
        html: false,
        game,
      };
    }
  });

  useContextProvider(LaunchContext, {
    ...launchStore,
    launchGameAction,
    closeLauncherDialog,
  });

  return (
    <>
      <Slot />
    </>
  );
});
