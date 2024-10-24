// let selectedOptions = [];

const optionIngredientMenu = document.querySelector('#ingredient-filter'),
    selectBtnIngredient = optionIngredientMenu.querySelector('.select-menu__btn'),
    optionsIngredient = optionIngredientMenu.querySelectorAll('.select-menu__option'),
    sBtnTextIngredient = optionIngredientMenu.querySelector('.select-btn__btn-text'),
    searchbarIngredientInput = optionIngredientMenu.querySelector('.select-menu__searchbar-input'),
    searchbarIngredientCancelButton = optionIngredientMenu.querySelector('.select-menu__searchbar-cancel');

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
    optionsEquipment = optionEquipmentMenu.querySelectorAll('.select-menu__option'),
    sBtnTextEquipment = optionEquipmentMenu.querySelector('.select-btn__btn-text'),
    searchbarEquipmentInput = optionEquipmentMenu.querySelector('.select-menu__searchbar-input'),
    searchbarEquipmentCancelButton = optionEquipmentMenu.querySelector('.select-menu__searchbar-cancel');

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
    optionsUstensil = optionUstensilMenu.querySelectorAll('.select-menu__option'),
    sBtnTextUstensil = optionUstensilMenu.querySelector('.select-btn__btn-text'),
    searchbarUstensilInput = optionUstensilMenu.querySelector('.select-menu__searchbar-input'),
    searchbarUstensilCancelButton = optionUstensilMenu.querySelector('.select-menu__searchbar-cancel');

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
