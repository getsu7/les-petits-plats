import { useRecipes } from '../composables/UseRecipes.js';
import { selectedOptionsEquipement, selectedOptionsIngredient, selectedOptionsUstensil } from './select.js';

const { updateRecipeState } = useRecipes();

const searchbar = document.querySelector('.searchbar'),
    searchbarInput = searchbar.querySelector('.searchbar__input'),
    searchbarCancelButton = searchbar.querySelector('.searchbar__cancel-button');

const recipesSection = document.querySelector('.recipes');

searchbarCancelButton.addEventListener('click', () => {
    searchbarInput.value = '';
    searchbarCancelButton.style.display = 'none';
    document.dispatchEvent(
        new CustomEvent('searchbarEmpty', {
            detail: {
                selectedOptionsIngredient: selectedOptionsIngredient,
                selectedOptionsEquipement: selectedOptionsEquipement,
                selectedOptionsUstensil: selectedOptionsUstensil,
            },
        })
    );
});

searchbarInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarCancelButton.style.display = 'block';
        if (text.target.value.length >= 3) {
            recipesSection.innerHTML = '';
            updateRecipeState(
                text.target.value,
                selectedOptionsIngredient,
                selectedOptionsEquipement,
                selectedOptionsUstensil
            );
            document.dispatchEvent(new CustomEvent('updateRecipeStateFromSearchbar'));
        }
    } else if (!text.target.value) {
        searchbarCancelButton.style.display = 'none';
        recipesSection.innerHTML = '';
        document.dispatchEvent(
            new CustomEvent('searchbarEmpty', {
                detail: {
                    selectedOptionsIngredient: selectedOptionsIngredient,
                    selectedOptionsEquipement: selectedOptionsEquipement,
                    selectedOptionsUstensil: selectedOptionsUstensil,
                },
            })
        );
    }
});
