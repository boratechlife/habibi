import {
  component$,
  createContextId,
  Signal,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import AuthComponent from "~/components/AuthComponent";
import { TheHeader } from "~/components/TheHeader";
import { AuthContext, AuthProvider } from "~/context/auth-context";
import { SiteInfo } from "~/data/site";

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

export const useProductDetails = routeLoader$(async () => {
  const url = `${process.env.PUBLIC_QWIK_API_URL}api/site`;
  const res = await fetch(url);
  const siteData = await res.json();
  return siteData;
});

export default component$(() => {
  const test = useProductDetails();

  const theme = useSignal("dark");

  useContextProvider(ThemeContext, theme);
  useContextProvider(SiteDataContext, test);

  return (
    <AuthProvider>
      <>
        <AuthComponent />
        <TheHeader />
        <Slot />
      </>
    </AuthProvider>
  );
});
