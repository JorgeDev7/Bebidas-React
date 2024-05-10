import { StateCreator } from 'zustand';
import type { Recipe } from '../types';
import { RecipesSlideType, createRecipesSlice } from './recipeSlide';

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe["idDrink"]) => boolean,
    loadFromStorage: () => void | "" | null;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSlideType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }));
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
        }

        createRecipesSlice(set, get, api).closeModal();
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites && set(
            {
                favorites: JSON.parse(storedFavorites)
            }
        );
    }
});