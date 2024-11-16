import { generateTemplate } from './components/recipeCard.js';
import { useRecipesService } from './composables/services/UseRecipesService.js';
const { getRecipes } = useRecipesService();

const recipeCounter = document.querySelector('.filters__nbrecipe');
recipeCounter.textContent = getRecipes().length.toString() + ' recettes';

const recipesSection = document.querySelector('.recipes');
getRecipes().forEach((recipe) => {
    recipesSection.appendChild(generateTemplate(recipe));
});

document.addEventListener('searchbarEmpty', () => {
    getRecipes().forEach((recipe) => {
        recipesSection.appendChild(generateTemplate(recipe));
    });
});
