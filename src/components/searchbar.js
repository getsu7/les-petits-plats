import { useRecipes } from '../composables/UseRecipes.js';
import { generateTemplate } from './recipeCard.js';

const { findRecipes } = useRecipes();

const searchbar = document.querySelector('.searchbar'),
    searchbarInput = searchbar.querySelector('.searchbar__input'),
    searchbarCancelButton = searchbar.querySelector('.searchbar__cancel-button');

const recipeCounter = document.querySelector('.filters__nbrecipe');

const recipesSection = document.querySelector('.recipes');

searchbarCancelButton.addEventListener('click', () => {
    searchbarInput.value = '';
    searchbarCancelButton.style.display = 'none';
});

searchbarInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarCancelButton.style.display = 'block';
        if (text.target.value.length >= 3) {
            recipesSection.innerHTML = '';
            const recipes = findRecipes(text.target.value);
            recipeCounter.textContent = recipes.size.toString() + ' recettes';
            recipes.forEach((recipe) => {
                recipesSection.appendChild(generateTemplate(recipe));
            });
            document.dispatchEvent(new CustomEvent('updateFilters', { detail: { recipes: recipes } }));
        }
    } else if (!text.target.value) {
        searchbarCancelButton.style.display = 'none';
        recipesSection.innerHTML = '';
        recipeCounter.textContent = findRecipes(text.target.value).size.toString() + ' recettes';
        document.dispatchEvent(new CustomEvent('searchbarEmpty'));
    }
});
