function isEmptyString(string) {
    return string.trim() === "";
}

function postalCodeFiveCharsValidation(postalCode) {
    return postalCode.trim().length === 5;
}

export default {
    isEmptyString,
    postalCodeFiveCharsValidation,
};
