import { generateRecipeCardTemplate } from './components/recipeCard.js';
import { useRecipesService } from './composables/services/UseRecipesService.js';
import { useRecipes } from './composables/UseRecipes.js';
const { getRecipes } = useRecipesService();
const { updateRecipeState } = useRecipes();

export const recipeState = new Set(getRecipes());

const recipeCounter = document.querySelector('.filters__nbrecipe');
const recipesSection = document.querySelector('.recipes');

const init = () => {
    recipeState.forEach((recipe) => {
        recipesSection.appendChild(generateRecipeCardTemplate(recipe));
    });
    recipeCounter.textContent = recipeState.size.toString() + ' recettes';
};

document.addEventListener('searchbarEmpty', (ev) => {
    recipeState.clear();
    getRecipes().forEach((recipe) => recipeState.add(recipe));
    updateRecipeState(
        '',
        ev.detail.selectedOptionsIngredient,
        ev.detail.selectedOptionsEquipement,
        ev.detail.selectedOptionsUstensil
    );
    init();
});

document.addEventListener('tagSelected', (ev) => {
    updateRecipeState(
        '',
        ev.detail.selectedOptionsIngredient,
        ev.detail.selectedOptionsEquipement,
        ev.detail.selectedOptionsUstensil
    );
    recipesSection.innerHTML = '';
    init();
});

document.addEventListener('updateRecipeStateFromSearchbar', () => {
    recipesSection.innerHTML = '';
    init();
});

init();
