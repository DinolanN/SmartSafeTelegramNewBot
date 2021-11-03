'use strict';

const conversationConstants = require('../Constants/ConversationConstants');
const startPickupConstants = conversationConstants.START_PICKUP;

const driverService = require('../APIService/DriverService');

const generalHelper = require('../Helpers/GeneralHelper');

const CONFIRM_DRIVER_FORM = {
    otp: {
	    q: startPickupConstants.ENTER_OPT_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isOTPValid(message.text)) {
			    callback(true, message.text);
			    return;
		    }

		    callback(false);
	    }
    }
}

const SCAN_BARCODE_FORM = {
    barcode: {
	    q: startPickupConstants.ENTER_BARCODE_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isNumber(message.text)) {
			    callback(true, message.text);
			    return;
		    }

		    callback(false);
	    }
    }
}

function SendWalletLocation(name, addressLineOne, addressLineTwo) {
	return `Your Pickup Client's name is: ${name}\n\n And your Pickup Address is:\n${addressLineOne}\n${addressLineTwo}`;
}

module.exports = {
	CONFIRM_DRIVER_FORM,
    SCAN_BARCODE_FORM,
	SendWalletLocation
};