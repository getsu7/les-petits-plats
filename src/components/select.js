import { recipeState } from '../index.js';
import { useRecipesService } from '../composables/services/UseRecipesService.js';
import { useRecipes } from '../composables/UseRecipes.js';
const { getIngredients, getUstensils, getAppliance } = useRecipesService();
const { findFromRecipes } = useRecipes();

export const selectedOptionsIngredient = new Set([]);
export const selectedOptionsEquipement = new Set([]);
export const selectedOptionsUstensil = new Set([]);
/*
 *
 *   INGREDIENT
 *
 * */
const optionIngredientMenu = document.querySelector('#ingredient-filter'),
    selectBtnIngredient = optionIngredientMenu.querySelector('.select-menu__btn'),
    optionsIngredient = optionIngredientMenu.querySelector('.select-menu__options'),
    searchbarIngredientInput = optionIngredientMenu.querySelector('.select-menu__searchbar-input'),
    searchbarIngredientCancelButton = optionIngredientMenu.querySelector('.select-menu__searchbar-cancel');

selectBtnIngredient.addEventListener('click', () => optionIngredientMenu.classList.toggle('active'));
searchbarIngredientInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarIngredientCancelButton.style.display = 'flex';
        if (text.target.value.length >= 3) {
            const ingredients = [];
            optionsIngredient.querySelectorAll('.select-menu__option').forEach((optionIngredient) => {
                ingredients.push(optionIngredient.textContent);
            });
            optionsIngredient.innerHTML = '';
            const result = findFromRecipes(text.target.value, ingredients);
            generateIngredientTemplate(result, true);
        }
    } else {
        optionsIngredient.innerHTML = '';
        generateIngredientTemplate();
        searchbarIngredientCancelButton.style.display = 'none';
    }
});

searchbarIngredientCancelButton.addEventListener('click', () => {
    searchbarIngredientInput.value = '';
    searchbarIngredientCancelButton.style.display = 'none';
});

/*
 *
 *   EQUIPEMENT
 *
 * */
const optionEquipmentMenu = document.querySelector('#equipment-filter'),
    selectEquipmentBtn = optionEquipmentMenu.querySelector('.select-menu__btn'),
    optionsEquipment = optionEquipmentMenu.querySelector('.select-menu__options'),
    searchbarEquipmentInput = optionEquipmentMenu.querySelector('.select-menu__searchbar-input'),
    searchbarEquipmentCancelButton = optionEquipmentMenu.querySelector('.select-menu__searchbar-cancel');

selectEquipmentBtn.addEventListener('click', () => optionEquipmentMenu.classList.toggle('active'));

searchbarEquipmentInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarEquipmentCancelButton.style.display = 'flex';
        if (text.target.value.length >= 3) {
            const equipements = [];
            optionsEquipment.querySelectorAll('.select-menu__option').forEach((optionEquipment) => {
                equipements.push(optionEquipment.textContent);
            });
            optionsEquipment.innerHTML = '';
            const result = findFromRecipes(text.target.value, equipements);
            generateApplianceTemplate(result, true);
        } else {
            optionsEquipment.innerHTML = '';
            generateApplianceTemplate();
            searchbarEquipmentCancelButton.style.display = 'none';
        }
    }
});

searchbarEquipmentCancelButton.addEventListener('click', () => {
    searchbarEquipmentInput.value = '';
    searchbarEquipmentCancelButton.style.display = 'none';
});

/*
 *
 *   USTENSIL
 *
 * */
const optionUstensilMenu = document.querySelector('#utensil-filter'),
    selectUstensilBtn = optionUstensilMenu.querySelector('.select-menu__btn'),
    optionsUstensil = optionUstensilMenu.querySelector('.select-menu__options'),
    searchbarUstensilInput = optionUstensilMenu.querySelector('.select-menu__searchbar-input'),
    searchbarUstensilCancelButton = optionUstensilMenu.querySelector('.select-menu__searchbar-cancel');

selectUstensilBtn.addEventListener('click', () => optionUstensilMenu.classList.toggle('active'));

searchbarUstensilInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarUstensilCancelButton.style.display = 'flex';
        if (text.target.value.length >= 3) {
            const ustensils = [];
            optionsUstensil.querySelectorAll('.select-menu__option').forEach((optionUstensil) => {
                ustensils.push(optionUstensil.textContent);
            });
            optionsUstensil.innerHTML = '';
            const result = findFromRecipes(text.target.value, ustensils);
            generateUstensilTemplate(result, true);
        } else {
            optionsUstensil.innerHTML = '';
            generateUstensilTemplate();
            searchbarUstensilCancelButton.style.display = 'none';
        }
    }
});

searchbarUstensilCancelButton.addEventListener('click', () => {
    searchbarUstensilInput.value = '';
    searchbarUstensilCancelButton.style.display = 'none';
});

/*
 *
 *   TEMPLATE
 *
 * */
const generateApplianceTemplate = (values = recipeState, fromSearchBar = false) => {
    const addApplianceRow = (applianceList) => {
        applianceList.forEach((appliance) => {
            const applianceRow = document.createElement('li');
            applianceRow.setAttribute('class', 'select-menu__option');
            const applianceText = document.createElement('span');
            applianceText.setAttribute('class', 'select-menu__text');
            applianceText.textContent = appliance;
            applianceRow.appendChild(applianceText);
            optionsEquipment.appendChild(applianceRow);
        });
    };

    const appliances = fromSearchBar ? values : getAppliance(values);

    addApplianceRow(appliances);
};

const generateUstensilTemplate = (values = recipeState, fromSearchBar = false) => {
    const addUstensilRow = (ustensilList) => {
        ustensilList.forEach((ustensil) => {
            const ustensilRow = document.createElement('li');
            ustensilRow.setAttribute('class', 'select-menu__option');
            const ustensilText = document.createElement('span');
            ustensilText.setAttribute('class', 'select-menu__text');
            ustensilText.textContent = ustensil;
            ustensilRow.appendChild(ustensilText);
            optionsUstensil.appendChild(ustensilRow);
        });
    };

    const ustensils = fromSearchBar ? values : getUstensils(values);

    addUstensilRow(ustensils);
};

const generateIngredientTemplate = (values = recipeState, fromSearchBar = false) => {
    const addIngredientRow = (ingredientList) => {
        ingredientList.forEach((ingredient) => {
            const ingredientRow = document.createElement('li');
            ingredientRow.setAttribute('class', 'select-menu__option');
            const ingredientText = document.createElement('span');
            ingredientText.setAttribute('class', 'select-menu__text');
            ingredientText.textContent = ingredient;
            ingredientRow.appendChild(ingredientText);
            optionsIngredient.appendChild(ingredientRow);
        });
    };

    const ingredients = fromSearchBar ? values : getIngredients(values);

    addIngredientRow(ingredients);
};

const clearFiltersSectionDom = () => {
    const filters = document.querySelectorAll('.select-menu__options');
    filters.forEach((filter) => {
        filter.innerHTML = '';
    });
};

const init = () => {
    clearFiltersSectionDom();
    generateIngredientTemplate();
    generateUstensilTemplate();
    generateApplianceTemplate();

    optionsEquipment.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsEquipement.add(option.innerText);
            document.dispatchEvent(
                new CustomEvent('tagSelected', {
                    detail: {
                        selectedOptionsEquipement: selectedOptionsEquipement,
                        selectedOptionsIngredient: selectedOptionsIngredient,
                        selectedOptionsUstensil: selectedOptionsUstensil,
                    },
                })
            );
            init();
        });
    });

    optionsIngredient.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsIngredient.add(option.innerText);
            document.dispatchEvent(
                new CustomEvent('tagSelected', {
                    detail: {
                        selectedOptionsEquipement: selectedOptionsEquipement,
                        selectedOptionsIngredient: selectedOptionsIngredient,
                        selectedOptionsUstensil: selectedOptionsUstensil,
                    },
                })
            );
            init();
        });
    });

    optionsUstensil.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsUstensil.add(option.innerText);
            document.dispatchEvent(
                new CustomEvent('tagSelected', {
                    detail: {
                        selectedOptionsEquipement: selectedOptionsEquipement,
                        selectedOptionsIngredient: selectedOptionsIngredient,
                        selectedOptionsUstensil: selectedOptionsUstensil,
                    },
                })
            );
            init();
        });
    });
};

/*
 *
 *   EVENTS
 *
 * */
document.addEventListener('updateRecipeStateFromSearchbar', () => {
    init();
});

document.addEventListener('searchbarEmpty', () => {
    init();
});

init();
