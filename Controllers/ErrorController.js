'use strict';

const Telegram = require('telegram-node-bot');

class ErrorController extends Telegram.TelegramBaseController {
    handle($) {
        $.sendMessage('Sorry, I do not understand.');
    }
}

module.exports = ErrorController;