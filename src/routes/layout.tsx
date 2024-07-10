import {
  component$,
  createContextId,
  type Signal,
  Slot,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import AuthComponent from "~/components/AuthComponent";
import { TheHeader } from "~/components/TheHeader";
import { AuthProvider } from "~/context/auth-context";
import { type SiteInfo } from "~/data/site";
import { type GamesI, type SeoInterface } from "~/interfaces";
import { type GetPasaranResponseI } from ".";
import { paths_to_show } from "~/utils/Main";
import ProfileWidget from "~/components/ProfileWidget";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const ThemeContext =
  createContextId<Signal<string>>("docs.theme-context");

export const SiteDataContext = createContextId<Signal<SiteInfo>>(
  "docs.site-info-context",
);

let siteInfo = "";

export type SiteData = {
  SiteGames: GamesI;
  title: string;
  siteInfo: SiteInfo;
};

export const useProductDetails = routeLoader$(async () => {
  siteInfo = await fetch(
    import.meta.env.PUBLIC_ASSETS +
      "/public-js/sites/" +
      import.meta.env.PUBLIC_MAIN_PARENT +
      "-sites.json",
  ).then(async (res) => await res.text());

  const _siteInfo = JSON.parse(siteInfo) as SeoInterface;

  return {
    ..._siteInfo,
    SiteGames: {},
  };
});

export const useGetPasaran = routeLoader$(async () => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");

  const url = `https://api.wirosablengonline.com/dora/pasaran-agent/${import.meta.env.PUBLIC_MAIN_PARENT}`;
  console.log("import", url);
  const res = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });
  const data: GetPasaranResponseI[] = await res.json();
  return data;
});

export default component$(() => {
  const test: any = useProductDetails();

  const theme = useSignal("dark");
  const loc = useLocation();

  useContextProvider(ThemeContext, theme);
  useContextProvider(SiteDataContext, test);

  return (
    <AuthProvider>
      <>
        <AuthComponent />
        {!paths_to_show.includes(loc.url.pathname) && (
          <>
            <TheHeader />

            <ProfileWidget />
          </>
        )}

        <Slot />
      </>
    </AuthProvider>
  );
});

export const head: DocumentHead = ({ head }) => ({
  title: "BIMATOTO - " + head.title,
});
