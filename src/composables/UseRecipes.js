import { useRecipesService } from './services/UseRecipesService.js';

const { getRecipes } = useRecipesService();

export const useRecipes = () => {
    const recipes = getRecipes();

    const retrieveAllElementsFromRecipes = () => {
        const allElements = [];

        const allRecipesNames = recipes.map((recipe) => ({
            ...recipe.id,
            id: recipe.id,
            value: recipe.name.toLowerCase(),
        }));

        allRecipesNames.forEach((recipeName) => allElements.push(recipeName));

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

        allRecipesIngredients.forEach((recipeIngredients) => {
            recipeIngredients.forEach((ingredient) => allElements.push(ingredient));
        });

        const allRecipesDescriptions = recipes.map((recipe) => ({
            ...recipe.id,
            id: recipe.id,
            value: recipe.description.toLowerCase(),
        }));

        allRecipesDescriptions.forEach((recipeDescription) => allElements.push(recipeDescription));

        return allElements;
    };

    const findRecipes = (input) => {
        input = input.toLowerCase();
        const allRecipesElements = retrieveAllElementsFromRecipes();
        const result = new Set([]);

        const filtered = allRecipesElements.filter((recipeElement) => recipeElement.value.includes(input));

        filtered.forEach((element) => result.add(recipes[element.id - 1]));

        return result;
    };

    return {
        retrieveAllElementsFromRecipes,
        findRecipes,
        recipes,
    };
};
