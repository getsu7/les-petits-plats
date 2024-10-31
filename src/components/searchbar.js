import { useRecipes } from '../composables/UseRecipes.js';

const { findRecipes } = useRecipes();

const searchbar = document.querySelector('.searchbar'),
    searchbarInput = searchbar.querySelector('.searchbar__input'),
    searchbarCancelButton = searchbar.querySelector('.searchbar__cancel-button');

searchbarInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarCancelButton.style.display = 'block';
        if (text.target.value.length >= 3) {
            findRecipes(text.target.value);
        }
    } else {
        searchbarCancelButton.style.display = 'none';
    }
});

searchbarCancelButton.addEventListener('click', () => {
    searchbarInput.value = '';
    searchbarCancelButton.style.display = 'none';
});
