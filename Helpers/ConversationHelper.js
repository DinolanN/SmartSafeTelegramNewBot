'use strict';

const conversationConstants = require('../Constants/ConversationConstants');

function checkHelloText(helloText) {
    if(conversationConstants.HELLO_OPTIONS.indexOf(helloText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkHelpText(helpText) {
    if(conversationConstants.HELP_OPTIONS.indexOf(helpText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkRegisterText(registerText) {
    if(conversationConstants.REGISTER_OPTIONS.indexOf(registerText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkRequestPickupText(requestPickupText) {
    if(conversationConstants.REQUEST_PICKUP_OPTIONS.indexOf(requestPickupText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkStartPickupText(startPickupText) {
    if(conversationConstants.START_PICKUP_OPTIONS.indexOf(startPickupText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkRequectPickupLocationText(requestLocationText) {
    if(conversationConstants.REQUEST_LOCATION_OPTIONS.indexOf(requestLocationText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkRequestAmountText(requectWalletSettlementAmountText) {
    if(conversationConstants.REQUEST_AMOUNT_OPTIONS.indexOf(requectWalletSettlementAmountText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkWalletAmountText(walletSettlementAmountText) {
    if(conversationConstants.WALLET_SETTLEMENT_AMOUNT_OPTIONS.indexOf(walletSettlementAmountText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkPickupAmountText(pickupAmountText) {
    if(conversationConstants.PICKUP_AMOUNT_OPTIONS.indexOf(pickupAmountText) !== -1){
        return true;
        } else {
        return false
    }
}

function checkGetMonthsPickupText(getMonthsPickupText) {
    if(conversationConstants.GET_MONTHS_PICKUP_OPTIONS.indexOf(getMonthsPickupText) !== -1){
        return true;
        } else {
        return false
    }
}

const ALL_COMMANDS = 'Here is a list commands that you can use: ' +
    '\n\n' + `${'Command'}` + `${' - '}` + 'Description' +
    '\n' + `${'-'.padEnd(47, '-')}` +
    '\n' + `${'R'}` + `${' - '}` + conversationConstants.HELP.REGISTER +
    '\n' + `${'RQ'}` + `${' - '}` + conversationConstants.HELP.REQUEST_PICKUP +
    '\n' + `${'RL'}` + `${' - '}` + conversationConstants.HELP.REQUEST_LOCATION +
    '\n' + `${'SP'}` + `${' - '}` + conversationConstants.HELP.START_PICKUP +
    '\n' + `${'RA'}` + `${' - '}` + conversationConstants.HELP.REQUEST_AMOUNT +
    '\n' + `${'GM'}` + `${' - '}` + conversationConstants.HELP.GET_MONTHS_SETTLEMENTS

const NORMAL_COMMANDS = 'Here is a list commands that you can use: ' +
    '\n\n' + `${'Command'}` + `${' - '}` + 'Description' +
    '\n' + `${'-'.padEnd(47, '-')}` +
    '\n' + `${'R'}` + `${' - '}` + conversationConstants.HELP.REGISTER +
    '\n' + `${'RQ'}` + `${' - '}` + conversationConstants.HELP.REQUEST_PICKUP +
    '\n' + `${'RA'}` + `${' - '}` + conversationConstants.HELP.REQUEST_AMOUNT +
    '\n' + `${'GM'}` + `${' - '}` + conversationConstants.HELP.GET_MONTHS_SETTLEMENTS

const DRIVER_COMMANDS = 'Here is a list commands that you can use: ' +
    '\n\n' + `${'Command'}` + `${' - '}` + 'Description' +
    '\n' + `${'-'.padEnd(47, '-')}` +
    '\n' + `${'R'}` + `${' - '}` + conversationConstants.HELP.REGISTER +
    '\n' + `${'RL'}` + `${' - '}` + conversationConstants.HELP.REQUEST_LOCATION +
    '\n' + `${'SP'}` + `${' - '}` + conversationConstants.HELP.START_PICKUP

module.exports = {
    checkHelloText,
    checkHelpText,
    checkRegisterText,
    checkRequestPickupText,
    checkStartPickupText,
    checkRequectPickupLocationText,
    checkRequestAmountText,
    checkWalletAmountText,
    checkPickupAmountText,
    checkGetMonthsPickupText,
    ALL_COMMANDS,
    NORMAL_COMMANDS,
    DRIVER_COMMANDS
}