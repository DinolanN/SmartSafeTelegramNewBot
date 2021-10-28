'use strict';

const Telegram = require('telegram-node-bot');

const registerModel = require('../Models/RegisterUserModel');
const requestPickupModel = require('../Models/RequestPickupModel');
const requestAmountModel = require('../Models/RequestAmountModel');

const userService = require('../APIService/UserService');

const userHelper = require('../Helpers/UserHelper');
const conversationHelper = require('../Helpers/ConversationHelper');

class UserController extends Telegram.TelegramBaseController {
    async registerHandler($) {
        let registerObj = Object.create(registerModel);
        
        $.runForm(userHelper.REGISTER_FORM, (result) => {
            if (result != null) {
                if (result.cellphoneNumber != null || result.cellphoneNumber != 0) {
                    registerObj.BarcodePin = result.cellphoneNumber;
                }
                registerObj.TelegramChatId = $.chatId;
            }
            
            userService.RegisterUser(registerObj, $);
        });
    }

    async requestPickupHandler($) {
        let requestPickupObj = Object.create(requestPickupModel);
        $.runForm(userHelper.REQUEST_PICKUP_FORM, (result) => {
            if (result != null) {
                if (result.expectedAmount != null || result.expectedAmount != 0.00) {
                    requestPickupObj.ExpectedAmount = result.expectedAmount;
                }
                requestPickupObj.UserChatId = $.chatId;
            }
            userService.RequestPickup(requestPickupObj, $);
        });
    }

    async requestAmountHandler($) {
        let requestAmountObj = Object.create(requestAmountModel);
        let command = '';
        $.runForm(userHelper.REQUEST_AMOUNT_FORM, (result) => {
            if (result != null) {
                if (result.expectedAmount != null || (conversationHelper.checkWalletAmountText(result.amountType) || conversationHelper.checkPickupAmountText(result.amountType))) {
                    command = result.amountType;
                }
                requestAmountObj.UserChatId = $.chatId;
            }
            userService.RequestAmountType(requestAmountObj, command, $);
        });
    }

    async getMonthPickupListHandler($) {
        let getmonthsListObj = Object.create(requestAmountModel);
        getmonthsListObj.UserChatId = $.chatId;
        userService.GetMonthsPickupList(getmonthsListObj, $);
    }

    get routes() {
        return {
            'registerCommand': 'registerHandler',
            'requestPickupCommand': 'requestPickupHandler',
            'requestAmountCommand': 'requestAmountHandler',
            'getMonthPickupListCommand': 'getMonthPickupListHandler'
        };
    }
}

module.exports = UserController;