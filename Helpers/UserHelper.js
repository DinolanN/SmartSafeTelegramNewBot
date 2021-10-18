'use strict';

const conversationConstants = require('../Constants/ConversationConstants');
const registrationConstants = conversationConstants.USER_REGISTRATION;
const requestPickupConstants = conversationConstants.REQUEST_PICKUP;

const generalHelper = require('../Helpers/GeneralHelper');

const REGISTER_FORM = {
    cellphoneNumber: {
	    q: registrationConstants.CELLPHONE_NUMBER_QUESTION,
	    error: registrationConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isCellphoneNumber(message.text)) {
			    callback(true, message.text); //you must pass the result also
			    return;
		    }

		    callback(false);
	    }
    }
}

const CONFIRMATION_CODE_FORM = {
    confirmationCode: {
	    q: registrationConstants.CONFIRMATION_CODE_QUESTION,
	    error: registrationConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isConfirmationCode(message.text)) {
			    callback(true, message.text)
			    return
		    }

		    callback(false)
	    }
    }
}

const UPDATE_DRIVER_DETAILS_FORM = {
    idNumber: {
	    q: registrationConstants.ID_NUMBER_QUESTION,
	    error: registrationConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isNumber(message.text)) {
			    callback(true, message.text)
			    return
		    }

		    callback(false)
	    }
    }
}

const REQUEST_PICKUP_FORM = {
    expectedAmount: {
	    q: requestPickupConstants.AMOUNT_PICK_UP_QUESTION,
	    error: requestPickupConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && generalHelper.isAmountInRands(message.text)) {
			    callback(true, parseFloat(message.text))
			    return
		    }

		    callback(false)
	    }
    }
}

function SendDriverDetails(fullName, otp) {
	return `Your Driver (${fullName}) will be arriving soon.\nPlease provide him with the OTP - ${otp}`;
}

module.exports = {
    REGISTER_FORM,
    CONFIRMATION_CODE_FORM,
	UPDATE_DRIVER_DETAILS_FORM,
	REQUEST_PICKUP_FORM,
	SendDriverDetails
};