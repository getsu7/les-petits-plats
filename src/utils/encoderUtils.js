export const stringEncode = (string) => {
    const stringEncoded = encodeURI(string);
    try {
        return decodeURI(stringEncoded);
    } catch (e) {
        console.error(e);
    }
};
