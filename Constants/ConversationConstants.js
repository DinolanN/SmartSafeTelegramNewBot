'use strict';

const HELLO_OPTIONS = ['hello', 'Hello', '/Hello', '/hello'];
const HELP_OPTIONS = ['help', 'Help', '/Help', '/help'];
const REGISTER_OPTIONS = ['register', 'Register', 'r', 'R'];
const REQUEST_PICKUP_OPTIONS = ['Request Pickup', 'Request pickup', 'request pickup', 'request Pickup', 'RequestPickup', 'Requestpickup', 'requestpickup', 'requestPickup', 'rq', 'Rq', 'RQ', 'rQ'];
const START_PICKUP_OPTIONS = ['Start Pickup', 'Start pickup', 'start pickup', 'start Pickup', 'StartPickup', 'Startpickup', 'startPickup', 'startpickup', 'sp', 'Sp', 'SP', 'sP'];
const REQUEST_LOCATION_OPTIONS = ['Request Location', 'Request location', 'request Location', 'request location', 'RequestLocation', 'Requestlocation', 'requestLocation', 'requestlocation', 'rl', 'Rl', 'RL', 'rL'];

const USER_REGISTRATION = {
    CELLPHONE_NUMBER_QUESTION: 'Enter your Cellphone Number.',
    CONFIRMATION_CODE_QUESTION: 'Enter the confirmation code that was emailed to you.',
    ID_NUMBER_QUESTION: 'Enter your ID Number.',
    WRONG_INPUT_ERROR: 'Sorry, Wrong input!',
    SOMETHING_WENT_WRONG: 'Something went wrong!'
}

const REQUEST_PICKUP = {
    AMOUNT_PICK_UP_QUESTION: 'Enter the Amount in Rands you want to be picked up.',
    SUCCESS_MESSAGE: 'Thanks message sent to Retro Rabbit!',
    WRONG_INPUT_ERROR: 'Sorry, Wrong input!',
    SOMETHING_WENT_WRONG: 'Something went wrong!'
}

const START_PICKUP = {
    PICKUP_STARTED: 'Pickup started, please proceed with caution.',
    LEAVING_OFFICE_QUESTION: 'Are you leaving the office?',
    ARRIVED_AT_OFFICE_QUESTION: 'Have you arrived at the office?',
    LEAVING_SITE_QUESTION: 'Are you leaving the client site?',
    ARRIVED_AT_SITE_QUESTION: 'Have you arrived at the client site?',
    ENTER_OPT_QUESTION: 'Enter the OTP from the Client.',
    ENTER_BARCODE_QUESTION: 'Enter the barcode on the bag.',
    WRONG_INPUT_ERROR: 'Sorry, Wrong input!',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    PICKUP_ENDED: 'Pickup complete, please proceed with the next one, when its available!',
    ARE_YOU_SURE: 'Are you sure?',
    YES: 'Yes',
    NO: 'No'
}

module.exports = {
    HELLO_OPTIONS,
    HELP_OPTIONS,
    REGISTER_OPTIONS,
    USER_REGISTRATION,
    REQUEST_PICKUP_OPTIONS,
    REQUEST_PICKUP,
    START_PICKUP_OPTIONS,
    START_PICKUP,
    REQUEST_LOCATION_OPTIONS
};