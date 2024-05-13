import { StateCreator } from 'zustand';
import type { Recipe } from '../types';
import { RecipesSlideType, createRecipesSlice } from './recipeSlide';
import { NotificationSliceType, createNotificationSlice } from './notificationSlice';

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe["idDrink"]) => boolean,
    loadFromStorage: () => void | "" | null,
    removeFavorites: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSlideType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }));
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de Favoritos',
                error: false
            });
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a Favoritos',
                error: false
            });
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
    },
    removeFavorites: () => {
        localStorage.removeItem('favorites');
        set({
            favorites: []
        });
    }
});