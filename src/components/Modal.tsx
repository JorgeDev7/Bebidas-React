import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

    const modal = useAppStore((state) => state.modal);
    const closeModal = useAppStore((state) => state.closeModal);
    const selectedRecipe = useAppStore((state) => state.selectedRecipe);
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
    const favoriteExists = useAppStore((state) => state.favoriteExists);

    const renderIngredients = () => {

        const ingredients: JSX.Element[] = [];

        for (let i = 1; i <= 9; i++) {
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

            if (ingredient && measure) {
                ingredients.push(
                    <li
                        key={i}
                        className='text-lg font-normal'
                    >
                        {ingredient} - {measure}
                    </li>
                );
            }
        }

        return ingredients;
    };

    return (
        <>
            <Transition appear show={modal}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={closeModal} __demoMode>
                    <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6">
                                    <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {selectedRecipe.strDrink}
                                    </DialogTitle>

                                    <img
                                        src={selectedRecipe.strDrinkThumb}
                                        alt={`image of ${selectedRecipe.strDrink}`}
                                        className='mx-auto w-96'
                                    />
                                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                    </DialogTitle>
                                    <ul>
                                        {renderIngredients()}
                                    </ul>
                                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                    </DialogTitle>

                                    <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                                    <div className='mt-5 flex justify-between gap-4'>
                                        <button
                                            type="button"
                                            className='w-full rounded bg-gray-600 hover:bg-gray-500 transition-colors duration-300 p-3 font-bold uppercase text-white shadow'
                                            onClick={closeModal}
                                        >Cerrar</button>

                                        <button
                                            type="button"
                                            className='w-full rounded bg-orange-600 hover:bg-orange-500 transition-colors duration-300 p-3 font-bold uppercase text-white shadow'
                                            onClick={() => handleClickFavorite(selectedRecipe)}
                                        >{favoriteExists(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}</button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
