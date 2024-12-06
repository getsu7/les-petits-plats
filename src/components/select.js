import { useRecipesService } from '../composables/services/UseRecipesService.js';
import { useRecipes } from '../composables/UseRecipes.js';
const { getIngredients, getUstensils, getAppliance, getRecipes } = useRecipesService();
const { findFromRecipes } = useRecipes();

const selectedOptionsIngredient = new Set([]);
const selectedOptionsEquipement = new Set([]);
const selectedOptionsUstensil = new Set([]);

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
            generateIngredientTemplate(result);
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
            generateApplianceTemplate(result);
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
 *   USTENCIL
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
            const ustencils = [];
            optionsUstensil.querySelectorAll('.select-menu__option').forEach((optionUstencil) => {
                optionsUstensil.push(optionUstencil.textContent);
            });
            optionsUstensil.innerHTML = '';
            const result = findFromRecipes(text.target.value, ustencils);
            generateUstencilTemplate(result);
        } else {
            optionsUstensil.innerHTML = '';
            generateUstencilTemplate();
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
const generateApplianceTemplate = (values = getAppliance(getRecipes()), fromSearchBar = false) => {
    if (fromSearchBar) {
        values = getAppliance(values);
    }
    values.forEach((appliance) => {
        const equipementRow = document.createElement('li');
        equipementRow.setAttribute('class', 'select-menu__option');
        const equipementText = document.createElement('span');
        equipementText.setAttribute('class', 'select-menu__text');
        equipementText.textContent = appliance;
        equipementRow.appendChild(equipementText);
        optionsEquipment.appendChild(equipementRow);
    });
};
const generateUstencilTemplate = (values = getUstensils(getRecipes()), fromSearchBar = false) => {
    if (fromSearchBar) {
        values = getUstensils(values);
    }
    values.forEach((ustensil) => {
        const ustensilRow = document.createElement('li');
        ustensilRow.setAttribute('class', 'select-menu__option');
        const ustensilText = document.createElement('span');
        ustensilText.setAttribute('class', 'select-menu__text');
        ustensilText.textContent = ustensil;
        ustensilRow.appendChild(ustensilText);
        optionsUstensil.appendChild(ustensilRow);
    });
};
const generateIngredientTemplate = (values = getIngredients(getRecipes()), fromSearchBar = false) => {
    if (fromSearchBar) {
        values = getIngredients(values);
    }
    values.forEach((ingredient) => {
        const ingredientRow = document.createElement('li');
        ingredientRow.setAttribute('class', 'select-menu__option');
        const ingredientText = document.createElement('span');
        ingredientText.setAttribute('class', 'select-menu__text');
        ingredientText.textContent = ingredient;
        ingredientRow.appendChild(ingredientText);
        optionsIngredient.appendChild(ingredientRow);
    });
};

const clearFiltersSectionDom = () => {
    const filters = document.querySelectorAll('.select-menu__options');
    filters.forEach((filter) => {
        filter.innerHTML = '';
    });
};

const init = () => {
    generateIngredientTemplate();
    generateUstencilTemplate();
    generateApplianceTemplate();

    optionsEquipment.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsEquipement.add(option.innerText);
        });
    });

    optionsIngredient.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsIngredient.add(option.innerText);
        });
    });

    optionsUstensil.querySelectorAll('.select-menu__option').forEach((option) => {
        option.addEventListener('click', () => {
            selectedOptionsUstensil.add(option.innerText);
        });
    });
};

/*
 *
 *   EVENTS
 *
 * */
document.addEventListener('updateFiltersFromSearchar', (ev) => {
    clearFiltersSectionDom();
    generateIngredientTemplate(ev.detail.recipes, true);
    generateUstencilTemplate(ev.detail.recipes, true);
    generateApplianceTemplate(ev.detail.recipes, true);
});

document.addEventListener('searchbarEmpty', () => {
    clearFiltersSectionDom();
    init();
});

init();
