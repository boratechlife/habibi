import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  useLocation,
  useNavigate,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { GameCard } from "~/components/GameCard";
import GamesCarousel from "~/components/GamesCarousel";
import { LeftSidebar } from "~/components/LeftSidebar";
import LobbyHeader from "~/components/LobbyHeader";
import { AuthContext } from "~/context/auth-context";
import { TransformedListI } from "~/data/site";
import { SiteDataContext } from "~/routes/layout";

export default component$(() => {
  const id = useLocation().params.id;

  const navigate = useNavigate();
  const authStore = useContext(AuthContext);
  const siteStore = useContext(SiteDataContext);

  const store = useStore({
    isClient: false,
    selectedProvider: "",
    toggleProvider: false,
    toggleSearch: false,
    gameSample: [] as TransformedListI[],
    searchKeyword: "",
    filteredGameSample: [] as TransformedListI[],
  });

  const filteredGames = useSignal<any[]>();
  const availableProviders = useSignal<any[]>();
  const categories = useSignal<any[]>();

  const fetchData = $(() => {
    setTimeout(() => {
      if (filteredGames.value) {
        store.gameSample = filteredGames.value
          .filter((g) =>
            store.selectedProvider.length > 0
              ? g.provider === store.selectedProvider
              : true,
          )
          .slice(0, store.gameSample.length + 12);
      }
    }, 100);
  });

  const fetchFilteredData = $(() => {
    setTimeout(() => {
      if (filteredGames) {
        store.filteredGameSample = filteredGames.value
          .filter((g) =>
            store.selectedProvider.length > 0
              ? g.provider === store.selectedProvider
              : true,
          )
          .filter((g) => g.name.includes(store.searchKeyword))
          .slice(0, store.filteredGameSample.length + 12);
      }
    }, 100);
  });

  // console.log("siteStore.value.SiteGames", siteStore.value.SiteGames);

  const handleProviderSelect = $((provider: string) => {
    store.selectedProvider = provider;
    fetchFilteredData();

    console.log("provider.....");
    // Fetch data based on the selected provider or perform other actions as needed
  });

  const getGamesBasedOnCategory = $(
    (categoryId: string): TransformedListI[] => {
      const siteGames = siteStore.value.SiteGames;

      let fGames: TransformedListI[] = [];
      let providers: Set<string> = new Set();
      let cats = [];

      if (categoryId === "99") {
        // Assuming 'isRecommend' property indicates recommended games
        for (const key in siteGames) {
          cats.push({
            cat_id: key,
            name: siteGames[key].name,
          });
          const games = siteGames[key].list;
          games.forEach((game: TransformedListI) => {
            if (game.isRecommend) {
              fGames.push(game);
              providers.add(game.provider);
            }
          });
        }
      } else {
        for (const key in siteGames) {
          cats.push({
            cat_id: key,
            name: siteGames[key].name,
          });
          if (siteGames[key].gType == Number(categoryId)) {
            const games = siteGames[key].list;
            games.forEach((game: TransformedListI) => {
              fGames.push(game);
              providers.add(game.provider);
            });
          }
        }
      }

      filteredGames.value = fGames;
      availableProviders.value = Array.from(providers);
      categories.value = cats;

      const availablePro = fGames
        .map((item) => {
          return {
            provider: item.provider,
            providerIdx: item.providerIdx,
            imgsrc: `${import.meta.env.PUBLIC_IMAGE_URL}/providers/myballs/${item.provider}.webp`,
          };
        })
        .flat();

      // Use a Set to filter out duplicates based on provider
      availableProviders.value = Array.from(
        new Map(availablePro.map((item) => [item.provider, item])).values(),
      );
      console.log("availableProviders", availableProviders.value);
      return fGames;
    },
  );

  useVisibleTask$(() => {
    store.isClient = true;
    store.selectedProvider = "";
    store.toggleProvider = false;

    if (
      availableProviders.value &&
      store.selectedProvider.length === 0 &&
      !location.pathname.includes("60") &&
      !location.pathname.includes("70")
    ) {
      store.selectedProvider = Array.from(availableProviders.value)[0] || "";
    }

    // USER AUTH
    if (authStore.user.token.length === 0) {
      navigate("/");
    }

    if (siteStore.value) {
      setTimeout(async () => {
        store.gameSample = (await getGamesBasedOnCategory(id))
          .filter((g) =>
            store.selectedProvider.length > 0
              ? g.provider === store.selectedProvider
              : true,
          )
          .slice(0, store.gameSample.length + 20);
      }, 100);
    }
  });

  useTask$(() => {
    // getGamesBasedOnCategory("7");
  });

  // const filteredGames = siteStore.filteredGames;
  // const availableProviders = siteStore.providers;

  return (
    <>
      <section class="flex flex-col  py-20">
        <LobbyHeader />
        <div class="flex">
          <div>
            {availableProviders.value && (
              <LeftSidebar
                providers={availableProviders.value}
                onProviderSelect$={handleProviderSelect}
              />
            )}
          </div>
          <div class="grow"></div>
          <div class="">
            <button class="rounded border border-solid border-white bg-gray-600 px-4 py-1 text-white  lg:px-12">
              Cari Game
            </button>
          </div>
        </div>
        <GamesCarousel />
        <div class="3xl:grid-cols-6 3xl:grid-cols-5 mt-5 grid w-full grid-cols-3 items-center gap-1 px-1 2xl:gap-2">
          {store.filteredGameSample.length > 0 &&
            store.filteredGameSample &&
            store.filteredGameSample.map((item, index) => (
              <GameCard
                image={`${import.meta.env.PUBLIC_ASSETS}/images${item.image}`}
                link="https://example.com"
                key={item.name + "filtered" + index}
                title={item.name}
              />
            ))}
          {store.filteredGameSample.length === 0 &&
            filteredGames.value &&
            filteredGames.value.map((item, index) => (
              <GameCard
                image={`${import.meta.env.PUBLIC_ASSETS}/images${item.image}`}
                link="https://example.com"
                key={item.name + "" + index}
                title={item.name}
              />
            ))}
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
