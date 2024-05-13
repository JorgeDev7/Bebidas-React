import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {

    const favorites = useAppStore((state) => state.favorites);
    const removeFavorites = useAppStore((state) => state.removeFavorites);
    const hasFavorites = useMemo(() => favorites.length, [favorites]);

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-6xl font-extrabold">Favoritos</h1>
                <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-600 px-5 py-2 text-white hover:text-slate-900 font-bold rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => removeFavorites()}
                    disabled={!favorites.length ? true : false}
                >
                    Eliminar Favoritos
                </button>
            </div>

            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
                    {favorites.map(drink => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">Los Favoritos se mostrará aquí</p>
            )}
        </>
    );
}
