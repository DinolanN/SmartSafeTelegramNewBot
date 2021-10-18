'use strict';

const conversationConstants = require('../Constants/ConversationConstants');
const startPickupConstants = conversationConstants.START_PICKUP;

const generalHelper = require('../Helpers/GeneralHelper');

const LEAVING_OFFICE_FORM = {
    hasLeft: {
	    q: startPickupConstants.LEAVING_OFFICE_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isYes(message.text)) {
			    callback(true, generalHelper.isYes(message.text));
			    return;
		    }

		    callback(false);
	    }
    }
}

const LEAVING_SITE_FORM = {
    hasLeft: {
	    q: startPickupConstants.LEAVING_SITE_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isYes(message.text)) {
			    callback(true, generalHelper.isYes(message.text));
			    return;
		    }

		    callback(false);
	    }
    }
}

const ARRIVED_AT_OFFICE_FORM = {
    hasLeft: {
	    q: startPickupConstants.ARRIVED_AT_OFFICE_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isYes(message.text)) {
			    callback(true, generalHelper.isYes(message.text));
			    return;
		    }

		    callback(false);
	    }
    }
}

const ARRIVED_AT_SITE_FORM = {
    hasLeft: {
	    q: startPickupConstants.ARRIVED_AT_SITE_QUESTION,
	    error: startPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isYes(message.text)) {
			    callback(true, generalHelper.isYes(message.text));
			    return;
		    }

		    callback(false);
	    }
    }
}

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
    LEAVING_OFFICE_FORM,
    LEAVING_SITE_FORM,
    ARRIVED_AT_OFFICE_FORM,
    ARRIVED_AT_SITE_FORM,
    CONFIRM_DRIVER_FORM,
    SCAN_BARCODE_FORM,
	SendWalletLocation
};