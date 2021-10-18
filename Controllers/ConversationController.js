'use strict';

const Telegram = require('telegram-node-bot');

class ConversationController extends Telegram.TelegramBaseController {
    helloHandler($) {
        $.sendMessage('Hello.');
    }

    helpHandler($) {
        $.sendMessage('Help.');
    }

    get routes() {
        return {
            'helloCommand': 'helloHandler',
            'helpCommand': 'helpHandler'
        };
    }
}

module.exports = ConversationController;