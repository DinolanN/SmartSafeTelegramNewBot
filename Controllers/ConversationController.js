'use strict';

const Telegram = require('telegram-node-bot');

const conversationHelper = require('../Helpers/ConversationHelper');

class ConversationController extends Telegram.TelegramBaseController {
    helloHandler($) {
        $.sendMessage('Hello.');
    }

    helpHandler($) {
        $.sendMessage(conversationHelper.ALL_COMMANDS);
    }

    get routes() {
        return {
            'helloCommand': 'helloHandler',
            'helpCommand': 'helpHandler'
        };
    }
}

module.exports = ConversationController;