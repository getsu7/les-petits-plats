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
            clearRecipeSectionDom();
            recipeCounter.textContent = findRecipes(text.target.value).size.toString() + ' recettes';
            findRecipes(text.target.value).forEach((recipe) => {
                recipesSection.appendChild(generateTemplate(recipe));
            });
        }
    } else if (!text.target.value) {
        searchbarCancelButton.style.display = 'none';
        clearRecipeSectionDom();
        recipeCounter.textContent = findRecipes(text.target.value).size.toString() + ' recettes';
        document.dispatchEvent(new CustomEvent('searchbarEmpty'));
    }
});

const clearRecipeSectionDom = () => {
    const recipeCards = recipesSection.querySelectorAll('.recipe-card');
    recipeCards.forEach((recipeCard) => {
        recipesSection.removeChild(recipeCard);
    });
};
