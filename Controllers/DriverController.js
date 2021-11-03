'use strict';

const Telegram = require('telegram-node-bot');

const conversationConstants = require('../Constants/ConversationConstants');
const startPickupConstants = conversationConstants.START_PICKUP;

const driverService = require('../APIService/DriverService');

const driverHelper = require('../Helpers/DriverHelper');

class DriverController extends Telegram.TelegramBaseController {
    async startPickupHandler($) {
        $.sendMessage(startPickupConstants.PICKUP_STARTED);
        driverService.LeavingOfficeMenu($);
    }

    async requestPickupLocationHandler($) {
        driverService.RequestPickupLocation($);
    }

    get routes() {
        return {
            'startPickupCommand': 'startPickupHandler',
            'requestPickupLocationCommand': 'requestPickupLocationHandler'
        };
    }
}

module.exports = DriverController;