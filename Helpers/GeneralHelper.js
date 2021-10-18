'use strict';

function isNumber(value) {
    return /^\d+$/.test(value);
}

function isCellphoneNumber(value) {
    return /^\d+$/.test(value) && value.length >= 10;
}

function isConfirmationCode(value) {
    return value.length == 6;
}

function isAmountInRands(value) {
    return isNumber(value);
}

function isYes(value) {
    return value == 'Yes' || value == 'yes';
}

function isOTPValid(value) {
    return isNumber(value) && value.length == 5;
}

module.exports ={
    isNumber,
    isCellphoneNumber,
    isConfirmationCode,
    isAmountInRands,
    isYes,
    isOTPValid
}