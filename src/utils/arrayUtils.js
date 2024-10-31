export const containsObject = (array, obj) => {
    return array.some((item) => Object.keys(obj).every((key) => item[key] === obj[key]));
};
