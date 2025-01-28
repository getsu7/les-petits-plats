import { stringEncode } from '../utils/encoderUtils.js';

export const generateRecipeCardTemplate = (recipe) => {
    const { image, name, ingredients, time, description } = recipe;

    const imagePath = 'assets/image/recipe/' + stringEncode(image);

    const ingredientList = document.createElement('ul');
    ingredientList.setAttribute('class', 'recipe-card__ingredients');

    ingredients.forEach((ingredient) => {
        const ingredientNode = document.createElement('li');
        ingredientNode.setAttribute('class', 'recipe-card__ingredient');

        ingredientNode.innerHTML = `
         <p class="recipe-card__ingredient-name">${ingredient.ingredient}</p>
        `;

        if (ingredient.unit) {
            const ingredientUnit = document.createElement('p');
            ingredientUnit.setAttribute('class', 'recipe-card__ingredient-unit');
            ingredientUnit.textContent = ingredient.unit;
            ingredientNode.querySelector('p').after(ingredientUnit);
        }

        if (ingredient.quantity) {
            const ingredientQuantity = document.createElement('p');
            ingredientQuantity.setAttribute('class', 'recipe-card__ingredient-quantity');
            ingredientQuantity.textContent = ingredient.quantity;
            ingredientNode.querySelector('p').after(ingredientQuantity);
        }

        ingredientList.appendChild(ingredientNode);
    });

    const card = document.createElement('article');
    card.setAttribute('class', 'recipe-card');

    card.innerHTML = `
        <i class="recipe-card__tag">${time}min</i>
        <img loading="lazy" src="${imagePath}" alt="nom recette" />
        <h2 class="recipe-card__title">${stringEncode(name)}</h2>
        <p>RECETTE</p>
        <p class="recipe-card__desc">${stringEncode(description)}</p>
        <p class="recipe-card__ingredient-section">INGREDIENTS</p>
    `;

    const ingredientSection = card.querySelector('.recipe-card__ingredient-section');
    ingredientSection.after(ingredientList);

    return card;
};
