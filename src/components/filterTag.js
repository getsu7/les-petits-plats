export const generateFilterTagTemplate = (tag, type) => {
    const filterTag = document.createElement('div');
    filterTag.setAttribute('class', `tag ${type}-selected`);
    filterTag.setAttribute('data-id', tag);

    const filterTagContent = document.createElement('p');
    filterTagContent.setAttribute('class', 'tag__text');
    filterTagContent.textContent = tag;

    const removeBtnContainer = document.createElement('div');
    removeBtnContainer.setAttribute('class', 'tag__remove-button');
    removeBtnContainer.setAttribute('data-id', tag);

    const filterTagRemoveBtn = document.createElement('i');
    filterTagRemoveBtn.setAttribute('class', 'fa-solid fa-xmark');

    removeBtnContainer.appendChild(filterTagRemoveBtn);

    filterTag.appendChild(filterTagContent);
    filterTag.appendChild(removeBtnContainer);

    return filterTag;
};
