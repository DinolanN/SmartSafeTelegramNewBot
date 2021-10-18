'use strict';

const Telegram = require('telegram-node-bot');

const registerModel = require('../Models/RegisterUserModel');
const requestPickupModel = require('../Models/RequestPickupModel');

const userService = require('../APIService/UserService');

const userHelper = require('../Helpers/UserHelper');

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

    get routes() {
        return {
            'registerCommand': 'registerHandler',
            'requestPickupCommand': 'requestPickupHandler'
        };
    }
}

module.exports = UserController;