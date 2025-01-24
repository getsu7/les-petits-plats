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

    // Retourne les éléments contenu dans les filtres
    const findFromRecipes = (input, filterValues) => {
        const result = new Set([]);
        const filtered = filterValues.filter((filterValue) => filterValue.toLowerCase().includes(input.toLowerCase()));

        filtered.forEach((value) => result.add(value));

        return result;
    };

    const updateRecipeState = (
        input = '',
        selectedOptionsIngredient = new Set(),
        selectedOptionsEquipement = new Set(),
        selectedOptionsUstensil = new Set()
    ) => {
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

        if (selectedOptionsEquipement.size > 0) {
            matchingRecipes = matchingRecipes.filter((recipe) =>
                Array.from(selectedOptionsEquipement).every(
                    (selectedAppliance) => recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()
                )
            );
        }

        if (selectedOptionsUstensil.size > 0) {
            matchingRecipes = matchingRecipes.filter((recipe) =>
                Array.from(selectedOptionsUstensil).every((selectedUstensil) =>
                    recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === selectedUstensil.toLowerCase())
                )
            );
        }

        // Maj recipe state
        recipeState.clear();
        matchingRecipes.forEach((recipe) => recipeState.add(recipe));
    };

    return {
        retrieveAllElementsFromRecipes,
        recipes,
        findFromRecipes,
        updateRecipeState,
    };
};
