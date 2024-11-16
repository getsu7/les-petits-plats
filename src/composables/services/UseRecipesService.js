import { recipes } from '../../../data/recipes.js';
import { stringEncode } from '../../utils/encoderUtils.js';

export const useRecipesService = () => {
    const getRecipes = () => {
        return recipes;
    };

    const getIngredients = () => {
        const ingredients = new Set([]);

        getRecipes().forEach((recipe) => {
            recipe.ingredients.forEach((ingredient) => ingredients.add(stringEncode(ingredient.ingredient)));
        });

        return ingredients;
    };

    const getUstensils = () => {
        const ustensils = new Set([]);

        getRecipes().forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => ustensils.add(stringEncode(ustensil)));
        });

        return ustensils;
    };

    const getAppliance = () => {
        const appliances = new Set([]);

        getRecipes().forEach((recipe) => appliances.add(stringEncode(recipe.appliance)));

        return appliances;
    };

    return { getRecipes, getIngredients, getUstensils, getAppliance };
};
