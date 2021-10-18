'use strict';
require('dotenv').config();

const { TOKEN } = process.env;
const Telegram = require('telegram-node-bot');
const CustomFilterCommand = require('telegram-node-bot/lib/routing/commands/CustomFilterCommand');
const tg = new Telegram.Telegram(TOKEN, {
    workers: 1
});

const conversationHelper = require('./Helpers/ConversationHelper');

const ConversationController = require('./Controllers/ConversationController');
const UserController = require('./Controllers/UserController');
const DriverController = require('./Controllers/DriverController');
const ErrorController = require('./Controllers/ErrorController');

const conversationController = new ConversationController();
const userController = new UserController();
const driverController = new DriverController();

tg.router.when(new CustomFilterCommand($ => {
        return conversationHelper.checkHelloText($.message.text)
    }, 'helloCommand'), conversationController)
.when(new CustomFilterCommand($ => {
        return conversationHelper.checkHelpText($.message.text)
    }, 'helpCommand'), conversationController)
.when(new CustomFilterCommand($ => {
        return conversationHelper.checkRegisterText($.message.text)
    }, 'registerCommand'), userController)
.when(new CustomFilterCommand($ => {
        return conversationHelper.checkRequestPickupText($.message.text)
    }, 'requestPickupCommand'), userController)
.when(new CustomFilterCommand($ => {
        return conversationHelper.checkStartPickupText($.message.text)
    }, 'startPickupCommand'), driverController)
.when(new CustomFilterCommand($ => {
        return conversationHelper.checkRequectPickupLocationText($.message.text)
    }, 'requestPickupLocationCommand'), driverController)
.otherwise(new ErrorController());
