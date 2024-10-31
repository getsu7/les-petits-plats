import { recipes } from '../../../data/recipes.js';

export const useRecipesService = () => {
    const getRecipes = () => {
        return recipes;
    };

    return { getRecipes };
};
