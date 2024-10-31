import { useRecipesService } from './services/UseRecipesService.js';
import { stringToArray } from '../utils/stringUtils.js';
import { containsObject } from '../utils/arrayUtils.js';

const { getRecipes } = useRecipesService();

export const useRecipes = () => {
    const recipes = getRecipes();

    const retrieveAllElementsFromRecipes = () => {
        const allRecipesNames = recipes.map((recipe) => ({
            ...recipe.id,
            id: recipe.id,
            value: recipe.name.toLowerCase(),
        }));

        const allRecipesIngredients = [];
        recipes.forEach((recipe) => {
            allRecipesIngredients.push(
                recipe.ingredients.map((ingredient) => ({
                    ...recipe.id,
                    id: recipe.id,
                    value: ingredient.ingredient.toLowerCase(),
                }))
            );
        });

        const allRecipesDescriptions = recipes.map((recipe) => ({
            ...recipe.id,
            id: recipe.id,
            value: stringToArray(recipe.description.toLowerCase()),
        }));

        return {
            allRecipesNames,
            allRecipesIngredients,
            allRecipesDescriptions,
        };
    };

    const retrieveRecipesByWord = (word, result, raw) => {
        if (raw.value.includes(word)) {
            const recipe = recipes.find((recipe) => recipe.id === raw.id);
            if (!containsObject(result, recipe)) {
                result.push(recipe);
            }
        }
    };

    const findRecipes = (input) => {
        const inputLowerCase = input.toLowerCase();
        const allRecipesElements = retrieveAllElementsFromRecipes();
        const inputToArray = stringToArray(inputLowerCase);
        const result = [];

        inputToArray.forEach((word) => {
            allRecipesElements.allRecipesNames.forEach((recipeName) => {
                retrieveRecipesByWord(word, result, recipeName);
            });
        });

        inputToArray.forEach((word) => {
            allRecipesElements.allRecipesIngredients.forEach((ingredients) => {
                ingredients.forEach((ingredient) => {
                    retrieveRecipesByWord(word, result, ingredient);
                });
            });
        });

        inputToArray.forEach((word) => {
            allRecipesElements.allRecipesDescriptions.forEach((description) => {
                retrieveRecipesByWord(word, result, description);
            });
        });

        console.log(result);

        return {
            result,
        };
    };
    return {
        retrieveAllElementsFromRecipes,
        findRecipes,
    };
};
