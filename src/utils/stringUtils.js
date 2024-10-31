export const stringToArray = (input) => {
    // prettier-ignore
    // Retire la ponctuation et les espaces tout en conservant les accents
    const cleanedInput = input.replace(/[^\p{L}\s]/gu, "").replace(/\s+/g, " ");

    return cleanedInput.trim().split(' ');
};
