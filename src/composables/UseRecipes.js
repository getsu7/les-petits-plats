import { useRecipesService } from './services/UseRecipesService.js';
import { recipeState } from '../index.js';

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

        return { allElements, allRecipesIngredients };
    };

    const findRecipes = (input, selectedOptionsIngredient) => {
        input = input.toLowerCase();
        const { allElements } = retrieveAllElementsFromRecipes();

        const filtered = allElements.filter((recipeElement) => recipeElement.value.includes(input));

        // Récupérer les recettes correspondant au texte saisi
        let matchingRecipes = filtered.map((element) => recipes[element.id - 1]);

        // Si des ingrédients sont sélectionnés, filtrer davantage
        if (selectedOptionsIngredient && selectedOptionsIngredient.size > 0) {
            matchingRecipes = matchingRecipes.filter((recipe) =>
                Array.from(selectedOptionsIngredient).every((selectedIngredient) =>
                    recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selectedIngredient.toLowerCase())
                )
            );
        }
        recipeState.clear();
        matchingRecipes.forEach((element) => recipeState.add(recipes[element.id - 1]));
    };

    // Retourne les éléments contenu dans les filtres
    const findFromRecipes = (input, filterValues) => {
        const result = new Set([]);
        const filtered = filterValues.filter((filterValue) => filterValue.toLowerCase().includes(input.toLowerCase()));

        filtered.forEach((value) => result.add(value));

        return result;
    };

    const filterRecipesByIngredients = (selectedOptionsIngredient) => {
        const result = Array.from(recipeState).filter((recipe) =>
            Array.from(selectedOptionsIngredient).every((selectedIngredient) =>
                recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selectedIngredient.toLowerCase())
            )
        );
        recipeState.clear();
        result.forEach((recipe) => recipeState.add(recipe));
    };

    const updateRecipeState = (input = '', selectedOptionsIngredient = new Set()) => {
        input = input.toLowerCase();

        const { allElements } = retrieveAllElementsFromRecipes();

        let matchingRecipes = allElements
            .filter((recipeElement) => recipeElement.value.includes(input))
            .map((element) => recipes[element.id - 1]);

        if (selectedOptionsIngredient.size > 0) {
            matchingRecipes = matchingRecipes.filter((recipe) =>
                Array.from(selectedOptionsIngredient).every((selectedIngredient) =>
                    recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === selectedIngredient.toLowerCase())
                )
            );
        }

        // Maj recipe state
        recipeState.clear();
        matchingRecipes.forEach((recipe) => recipeState.add(recipe));
    };

    return {
        retrieveAllElementsFromRecipes,
        findRecipes,
        recipes,
        findFromRecipes,
        filterRecipesByIngredients,
        updateRecipeState,
    };
};
