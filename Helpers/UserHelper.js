'use strict';

const conversationConstants = require('../Constants/ConversationConstants');
const registrationConstants = conversationConstants.USER_REGISTRATION;
const requestPickupConstants = conversationConstants.REQUEST_PICKUP;
const requestAmountConstants = conversationConstants.REQUEST_AMOUNT;

const generalHelper = require('../Helpers/GeneralHelper');
const conversationHelper = require('../Helpers/ConversationHelper');

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

const requestAmountQuestion = requestAmountConstants.AMOUNT_TYPE +
	'\n\n' + `${'Command'.padEnd(10)}` + `${'-'.padEnd(10)}` + 'Description' + 
	'\n' + `${'-'.padEnd(47, '-')}` +
	'\n' + `${'WA'.padEnd(18)}` + `${'-'.padEnd(10)}` + requestAmountConstants.SELECT_WALLET_AMOUNT +
	'\n' + `${'PA'.padEnd(19)}` + `${'-'.padEnd(10)}` + requestAmountConstants.SELECT_PICKUP_AMOUNT

const REQUEST_AMOUNT_FORM = {
    amountType: {
	    q: requestAmountQuestion,
	    error: requestAmountConstants.WRONG_INPUT_ERROR,
	    validator: (message, callback) => {
		    if(message.text && (conversationHelper.checkWalletAmountText(message.text) || conversationHelper.checkPickupAmountText(message.text))) {
			    console.log(requestAmountQuestion);
				callback(true, message.text)
			    return
		    }

		    callback(false)
	    }
    }
}

function SendDriverDetails(fullName, otp) {
	return `Your Driver (${fullName}) will be arriving soon.\nPlease provide him with the OTP - ${otp}`;
}

function sendStructuredMonthsPickupList(listOfPickups) {
	let monthsList = 'Current Month Requests: \n' +
		'Expected Amount - EA\n' +
		'Deposited Amount - DA\n' +
		'Settlement Amount - SA\n' +
		`${'-'.padEnd(47, '-')}\n\n` +
		`${'Date'.padEnd(18)} - ` + `${'EA'.padEnd(10)} - ` + `${'DA'.padEnd(10)} - ` + `${'SA'.padEnd(10)}` + '\n';

	listOfPickups.forEach(pickup => {
		const pickupDate = pickup.createdOnUtc.toString().split('T');
		monthsList += `${pickupDate[0]}   -  `+ `R${pickup.expectedAmount}   -  `+ `R${pickup.depositedAmount == 0 ? pickup.depositedAmount.toString().padEnd(6) : pickup.depositedAmount}   -  `+ `R${pickup.expectedSettlementAmount}` + '\n'
	});

	return monthsList;
}

module.exports = {
    REGISTER_FORM,
    CONFIRMATION_CODE_FORM,
	UPDATE_DRIVER_DETAILS_FORM,
	REQUEST_PICKUP_FORM,
	REQUEST_AMOUNT_FORM,
	SendDriverDetails,
	sendStructuredMonthsPickupList
};