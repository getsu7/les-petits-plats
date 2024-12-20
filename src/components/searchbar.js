import { useRecipes } from '../composables/UseRecipes.js';
import { selectedOptionsIngredient } from './select.js';

const { findRecipes } = useRecipes();

const searchbar = document.querySelector('.searchbar'),
    searchbarInput = searchbar.querySelector('.searchbar__input'),
    searchbarCancelButton = searchbar.querySelector('.searchbar__cancel-button');

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
            findRecipes(text.target.value, selectedOptionsIngredient);
            document.dispatchEvent(new CustomEvent('updateRecipeStateFromSearchbar'));
        }
    } else if (!text.target.value) {
        searchbarCancelButton.style.display = 'none';
        recipesSection.innerHTML = '';
        document.dispatchEvent(
            new CustomEvent('searchbarEmpty', { detail: { selectedOptionsIngredient: selectedOptionsIngredient } })
        );
    }
});
