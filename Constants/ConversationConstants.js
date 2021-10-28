'use strict';

const HELLO_OPTIONS = [
    'hello',
    'Hello',
    'Hi',
    'hi',
    'hey',
    'Hey',
    '/Hello',
    '/hello'
];

const HELP_OPTIONS = [
    'help',
    'Help',
    '/Help',
    '/help'
];

const REGISTER_OPTIONS = [
    'register',
    'Register',
    'r',
    'R'
];

const REQUEST_PICKUP_OPTIONS = [
    'Request Pickup',
    'Request pickup',
    'request pickup',
    'request Pickup',
    'RequestPickup',
    'Requestpickup',
    'requestpickup',
    'requestPickup',
    'rq',
    'Rq',
    'RQ',
    'rQ'
];

const START_PICKUP_OPTIONS = [
    'Start Pickup',
    'Start pickup',
    'start pickup',
    'start Pickup',
    'StartPickup',
    'Startpickup',
    'startPickup',
    'startpickup',
    'sp',
    'Sp',
    'SP',
    'sP'
];

const REQUEST_LOCATION_OPTIONS = [
    'Request Location',
    'Request location',
    'request Location',
    'request location',
    'RequestLocation',
    'Requestlocation',
    'requestLocation',
    'requestlocation',
    'rl',
    'Rl',
    'RL',
    'rL'
];

const REQUEST_AMOUNT_OPTIONS = [
    'Request Amount',
    'Request amount',
    'request amount',
    'request Amount',
    'RequestAmount',
    'Requestamount',
    'requestamount',
    'requestAmount',
    'ra',
    'Ra',
    'RA',
    'rA'
];

const PICKUP_AMOUNT_OPTIONS = [
    'Pickup Amount',
    'Pickup amount',
    'pickup amount',
    'pickup Amount',
    'PickupAmount',
    'Pickupamount',
    'pickupamount',
    'pickupAmount',
    'pa',
    'Pa',
    'PA',
    'pA'
];

const WALLET_SETTLEMENT_AMOUNT_OPTIONS = [
    'Wallet Amount',
    'Wallet amount',
    'wallet amount',
    'wallet Amount',
    'WalletAmount',
    'Walletamount',
    'walletamount',
    'walletAmount',
    'wa',
    'Wa',
    'WA',
    'wA'
];

const GET_MONTHS_PICKUP_OPTIONS = [
    'Get Months',
    'Get months',
    'get months',
    'get Months',
    'GetMonths',
    'Getmonths',
    'getmonths',
    'getMonths',
    'gm',
    'Gm',
    'GM',
    'gM'
];

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

const REQUEST_AMOUNT = {
    AMOUNT_TYPE: 'Select the type of balance:',
    SELECT_WALLET_AMOUNT: 'Amount to be Settled',
    SELECT_PICKUP_AMOUNT: 'Today\'s Pickup Amount',
    WRONG_INPUT_ERROR: 'Sorry, Wrong input!',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
}

const HELP = {
    REGISTER: 'Register',
    REQUEST_PICKUP: 'Request Pickup',
    START_PICKUP: 'Start Pickup',
    REQUEST_LOCATION: 'Request Pickup Location',
    REQUEST_AMOUNT: 'Request Balances',
    GET_MONTHS_SETTLEMENTS: 'List of Month\'s Settlement'
}

module.exports = {
    HELLO_OPTIONS,
    HELP_OPTIONS,
    HELP,
    REGISTER_OPTIONS,
    USER_REGISTRATION,
    REQUEST_PICKUP_OPTIONS,
    REQUEST_PICKUP,
    START_PICKUP_OPTIONS,
    START_PICKUP,
    REQUEST_LOCATION_OPTIONS,
    REQUEST_AMOUNT_OPTIONS,
    PICKUP_AMOUNT_OPTIONS,
    WALLET_SETTLEMENT_AMOUNT_OPTIONS,
    REQUEST_AMOUNT,
    GET_MONTHS_PICKUP_OPTIONS
};