import { create } from "zustand";
import { devtools } from 'zustand/middleware';
import { RecipesSlideType, createRecipesSlice } from "./recipeSlide";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";

export const useAppStore = create<RecipesSlideType & FavoritesSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a)
})));