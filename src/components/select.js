import { recipeState } from '../index.js';
import { useRecipesService } from '../composables/services/UseRecipesService.js';
import { useRecipes } from '../composables/UseRecipes.js';
import { generateFilterTagTemplate } from './filterTag.js';
const { getIngredients, getUstensils, getAppliance } = useRecipesService();
const { findFromRecipes } = useRecipes();

export const selectedOptionsIngredient = new Set([]);
export const selectedOptionsEquipement = new Set([]);
export const selectedOptionsUstensil = new Set([]);

/*
 *
 *   TAG
 *
 * */
const tagSection = document.querySelector('.tags'),
    tagIngredientSection = tagSection.querySelector('.tags__ingredient'),
    tagEquipmentSection = tagSection.querySelector('.tags__equipment'),
    tagUstensilSection = tagSection.querySelector('.tags__ustensil');
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
    optionsIngredient.innerHTML = '';
    generateIngredientTemplate();
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
    optionsEquipment.innerHTML = '';
    generateApplianceTemplate();
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
    optionsUstensil.innerHTML = '';
    generateUstensilTemplate();
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
    setupOptionClickHandler(optionsEquipment, selectedOptionsEquipement, tagEquipmentSection, 'equipment');
    setupRemoveTagHandler(tagEquipmentSection, selectedOptionsEquipement, 'tagUpdated');
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
    setupOptionClickHandler(optionsUstensil, selectedOptionsUstensil, tagUstensilSection, 'ustensil');
    setupRemoveTagHandler(tagUstensilSection, selectedOptionsUstensil, 'tagUpdated');
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
    setupOptionClickHandler(optionsIngredient, selectedOptionsIngredient, tagIngredientSection, 'ingredient');
    setupRemoveTagHandler(tagIngredientSection, selectedOptionsIngredient, 'tagUpdated');
};

const clearFiltersSectionDom = () => {
    const filters = document.querySelectorAll('.select-menu__options');
    filters.forEach((filter) => {
        filter.innerHTML = '';
    });
};

const setupOptionClickHandler = (options, selectedOptions, section, type) => {
    const searchbarInput = document.querySelector('.searchbar__input').value;
    options.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            if (!selectedOptions.has(option.textContent)) {
                section.appendChild(generateFilterTagTemplate(option.textContent, type));
            }
            selectedOptions.add(option.textContent);
            document.dispatchEvent(
                new CustomEvent('tagUpdated', {
                    detail: {
                        searchbarInput: searchbarInput,
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

const setupRemoveTagHandler = (section, selectedOptions, eventName) => {
    if (selectedOptions.size > 0) {
        const searchbarInput = document.querySelector('.searchbar__input').value;
        const allRemoveBtn = section.querySelectorAll('.tag__remove-button');
        allRemoveBtn.forEach((removeButton) => {
            removeButton.addEventListener('click', function (ev) {
                const tagName = ev.currentTarget.parentElement.dataset.id;
                ev.currentTarget.parentElement.remove();
                if (selectedOptions.has(tagName)) {
                    selectedOptions.delete(tagName);
                    document.dispatchEvent(
                        new CustomEvent(eventName, {
                            detail: {
                                searchbarInput: searchbarInput,
                                selectedOptionsEquipement: selectedOptionsEquipement,
                                selectedOptionsIngredient: selectedOptionsIngredient,
                                selectedOptionsUstensil: selectedOptionsUstensil,
                            },
                        })
                    );
                    init();
                }
            });
        });
    }
};

const init = () => {
    clearFiltersSectionDom();
    generateIngredientTemplate();
    generateUstensilTemplate();
    generateApplianceTemplate();
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
