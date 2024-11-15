import { useRecipesService } from './services/UseRecipesService.js';

const { getRecipes } = useRecipesService();

export const useRecipes = () => {
    const recipes = getRecipes();

    const findRecipesByWord = (word) => {
        const result = new Set([]);
        word = word.toLowerCase();

        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(word)) {
                result.add(recipes[i]);
            } else if (recipes[i].description.toLowerCase().includes(word)) {
                result.add(recipes[i]);
            } else {
                recipes[i].ingredients.forEach((ingredient) => {
                    if (ingredient.ingredient.toLowerCase().includes(word)) {
                        result.add(recipes[i]);
                    }
                });
            }
        }
        return result;
    };

    return {
        findRecipesByWord,
    };
};
