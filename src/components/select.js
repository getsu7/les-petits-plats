import { useRecipesService } from '../composables/services/UseRecipesService.js';
const { getIngredients, getUstensils, getAppliance } = useRecipesService();

console.log(getIngredients());
console.log(getUstensils());
console.log(getAppliance());

const optionIngredientMenu = document.querySelector('#ingredient-filter'),
    selectBtnIngredient = optionIngredientMenu.querySelector('.select-menu__btn'),
    optionsIngredient = optionIngredientMenu.querySelector('.select-menu__options'),
    sBtnTextIngredient = optionIngredientMenu.querySelector('.select-btn__btn-text'),
    searchbarIngredientInput = optionIngredientMenu.querySelector('.select-menu__searchbar-input'),
    searchbarIngredientCancelButton = optionIngredientMenu.querySelector('.select-menu__searchbar-cancel');

getIngredients().forEach((ingredient) => {
    const ingredientRow = document.createElement('li');
    ingredientRow.setAttribute('class', 'select-menu__option');
    const ingredientText = document.createElement('span');
    ingredientText.setAttribute('class', 'select-menu__text');
    ingredientText.textContent = ingredient;
    ingredientRow.appendChild(ingredientText);
    optionsIngredient.appendChild(ingredientRow);
});

selectBtnIngredient.addEventListener('click', () => optionIngredientMenu.classList.toggle('active'));
searchbarIngredientInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarIngredientCancelButton.style.display = 'flex';
    } else {
        searchbarIngredientCancelButton.style.display = 'none';
    }
});

searchbarIngredientCancelButton.addEventListener('click', () => {
    searchbarIngredientInput.value = '';
    searchbarIngredientCancelButton.style.display = 'none';
});

// optionsIngredient.forEach((option) => {
//     option.addEventListener('click', () => {
//         const optionText = option.querySelector('.select-menu__text');
//         if (optionText !== null) {
//             selectedOptions.push(option.querySelector('.select-menu__text').innerText);
//         }
//     });
// });

const optionEquipmentMenu = document.querySelector('#equipment-filter'),
    selectEquipmentBtn = optionEquipmentMenu.querySelector('.select-menu__btn'),
    optionsEquipment = optionEquipmentMenu.querySelector('.select-menu__options'),
    sBtnTextEquipment = optionEquipmentMenu.querySelector('.select-btn__btn-text'),
    searchbarEquipmentInput = optionEquipmentMenu.querySelector('.select-menu__searchbar-input'),
    searchbarEquipmentCancelButton = optionEquipmentMenu.querySelector('.select-menu__searchbar-cancel');

getAppliance().forEach((appliance) => {
    const equipementRow = document.createElement('li');
    equipementRow.setAttribute('class', 'select-menu__option');
    const equipementText = document.createElement('span');
    equipementText.setAttribute('class', 'select-menu__text');
    equipementText.textContent = appliance;
    equipementRow.appendChild(equipementText);
    optionsEquipment.appendChild(equipementRow);
});

selectEquipmentBtn.addEventListener('click', () => optionEquipmentMenu.classList.toggle('active'));
searchbarEquipmentInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarEquipmentCancelButton.style.display = 'flex';
    } else {
        searchbarEquipmentCancelButton.style.display = 'none';
    }
});

searchbarEquipmentCancelButton.addEventListener('click', () => {
    searchbarEquipmentInput.value = '';
    searchbarEquipmentCancelButton.style.display = 'none';
});
// optionsEquipment.forEach((option) => {
//     option.addEventListener('click', () => {
//         const optionText = option.querySelector('.select-menu__text');
//         if (optionText !== null) {
//             selectedOptions.push(option.querySelector('.select-menu__text').innerText);
//         }
//     });
// });

const optionUstensilMenu = document.querySelector('#utensil-filter'),
    selectUstensilBtn = optionUstensilMenu.querySelector('.select-menu__btn'),
    optionsUstensil = optionUstensilMenu.querySelector('.select-menu__options'),
    sBtnTextUstensil = optionUstensilMenu.querySelector('.select-btn__btn-text'),
    searchbarUstensilInput = optionUstensilMenu.querySelector('.select-menu__searchbar-input'),
    searchbarUstensilCancelButton = optionUstensilMenu.querySelector('.select-menu__searchbar-cancel');

getUstensils().forEach((ustensil) => {
    const ustensilRow = document.createElement('li');
    ustensilRow.setAttribute('class', 'select-menu__option');
    const ustensilText = document.createElement('span');
    ustensilText.setAttribute('class', 'select-menu__text');
    ustensilText.textContent = ustensil;
    ustensilRow.appendChild(ustensilText);
    optionsUstensil.appendChild(ustensilRow);
});

selectUstensilBtn.addEventListener('click', () => optionUstensilMenu.classList.toggle('active'));
searchbarUstensilInput.addEventListener('input', (text) => {
    if (text.target.value) {
        searchbarUstensilCancelButton.style.display = 'flex';
    } else {
        searchbarUstensilCancelButton.style.display = 'none';
    }
});

searchbarUstensilCancelButton.addEventListener('click', () => {
    searchbarUstensilInput.value = '';
    searchbarUstensilCancelButton.style.display = 'none';
});
// optionsUstensil.forEach((option) => {
//     option.addEventListener('click', () => {
//         const optionText = option.querySelector('.select-menu__text');
//         if (optionText !== null) {
//             selectedOptions.push(option.querySelector('.select-menu__text').innerText);
//         }
//     });
// });
