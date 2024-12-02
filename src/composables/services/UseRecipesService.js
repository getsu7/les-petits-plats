import { stringEncode } from '../../utils/encoderUtils.js';
import { recipes } from '../../../data/recipes.js';

export const useRecipesService = () => {
    const getRecipes = () => {
        return recipes;
    };

    const getIngredients = (recipes) => {
        const ingredients = new Set([]);

        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => ingredients.add(stringEncode(ingredient.ingredient)));
        });

        return ingredients;
    };

    const getUstensils = (recipes) => {
        const ustensils = new Set([]);

        recipes.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => ustensils.add(stringEncode(ustensil)));
        });

        return ustensils;
    };

    const getAppliance = (recipes) => {
        const appliances = new Set([]);

        recipes.forEach((recipe) => appliances.add(stringEncode(recipe.appliance)));

        return appliances;
    };

    return { getRecipes, getIngredients, getUstensils, getAppliance };
};
