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

module.exports = {
    checkHelloText,
    checkHelpText,
    checkRegisterText,
    checkRequestPickupText,
    checkStartPickupText,
    checkRequectPickupLocationText
}