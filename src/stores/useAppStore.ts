import { create } from "zustand";
import { devtools } from 'zustand/middleware';
import { RecipesSlideType, createRecipesSlice } from "./recipeSlide";

export const useAppStore = create<RecipesSlideType>()(devtools((...a) => ({
    ...createRecipesSlice(...a)
})));