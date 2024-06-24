import type { GamesI, TabName } from "./site";
import { reverseMap } from "~/utils/Main";

const NEW_CATEGORY_ORDER = [
  "favorite",
  "lottery",
  "slot",
  "sports",
  "livecasino",
  "arcade",
  "fish",
  "table",
];

export interface PageStore {
  defaultCategoryId: number;
  CategoryId: number;
  providerFilter: any[];
  gamePageSize: number;
  gamePageNumber: number;
  gameTotalPages: number;
  gameFilterInput: string;
  getCategories: (rawGames: GamesI) => Category[];
}

export interface Category {
  index: number;
  gType: number;
  name: string;
  icon: string;
  value: string;
  title: string;
  default: boolean;
}

export type GameName =
  | "sports"
  | "livecasino"
  | "poker"
  | "slot"
  | "favorite"
  | "arcade"
  | "table"
  | "fish"
  | "lottery";

export const CategoryIcon = {
  sports: "Sports",
  livecasino: "Livecasino",
  poker: "Poker",
  slot: "Slot",
  favorite: "Favorite",
  arcade: "Arcade",
  table: "Table",
  fish: "Fish",
  lottery: "Lottery",
};

export const store = {
  defaultCategoryId: 0,
  CategoryId: 0,
  providerFilter: [],
  gamePageSize: 48,
  gamePageNumber: 1,
  gameTotalPages: 0,
  gameFilterInput: "",
  getCategories: (rawGames: GamesI) => {
    const categories: Category[] = [];

    for (const [key] of Object.entries(rawGames)) {
      const retrievedGames = rawGames[key as TabName];
      categories.push({
        index: reverseMap(retrievedGames.name.toLowerCase()),
        gType: Number(key),
        name: retrievedGames.name.toLowerCase(),
        icon: CategoryIcon[retrievedGames.name.toLowerCase() as GameName],
        value: retrievedGames.name.toLowerCase(),
        title: retrievedGames.name.toLowerCase(),
        default: store.defaultCategoryId === Number(key),
      });
    }

    const newCategories = categories
      .filter((category) => !["lottery"].includes(category.name))
      .concat([
        {
          index: 12,
          gType: Number(12),
          name: "lottery",
          icon: CategoryIcon["lottery" as GameName],
          value: "lottery",
          title: "lottery",
          default: false,
        },
      ]);

    newCategories.sort((a, b) => {
      const indexA = NEW_CATEGORY_ORDER.indexOf(a.name);
      const indexB = NEW_CATEGORY_ORDER.indexOf(b.name);
      return indexA - indexB;
    });

    return newCategories;
  },
};
