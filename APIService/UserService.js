'use-strict';
require('dotenv').config();

const { API_URL} = process.env;
const axios = require('axios');

const conversationConstants = require('../Constants/ConversationConstants');
const registrationConstants = conversationConstants.USER_REGISTRATION;
const requestPickupConstants = conversationConstants.REQUEST_PICKUP;
const requestAmountConstants = conversationConstants.REQUEST_AMOUNT;

const registerDriverModel = require('../Models/RegisterDriverModel');

const userHelper = require('../Helpers/UserHelper');
const conversationHelper = require('../Helpers/ConversationHelper');

async function RegisterUser(registerModel, $) {
    await axios.post(`${API_URL}/RegisterUser`, {
        BarcodePin: registerModel.BarcodePin,
        TelegramChatId: registerModel.TelegramChatId
    }).then(res => {
        let registerObj = Object.create(registerModel);
        $.setUserSession('AccessToken', res.headers.accesstoken)
        .then(() => {
            return $.getUserSession('AccessToken')
        });

        $.setUserSession('Permission', res.headers.permission)
        .then(() => {
            return $.getUserSession('Permission')
        });

        if (res.data == 1) {
            $.runForm(userHelper.CONFIRMATION_CODE_FORM, (result) => {
                if (result != null) {
                    if (result.confirmationCode != null || result.confirmationCode != 0) {
                        registerObj.ConfirmationCode = result.confirmationCode;
                    }
                    registerObj.TelegramChatId = $.chatId;
                }
    
                ConfirmUser(registerObj, registerModel.BarcodePin, $);
            });
        }
    })
    .catch((error) => {
        $.sendMessage(registrationConstants.SOMETHING_WENT_WRONG + `\n\n${error.response.data}`);
    })
}

async function ConfirmUser(registerModel, barcodePin, $) {
    let driverObj = Object.create(registerDriverModel);

    $.getUserSession('AccessToken')
        .then((accessToken) => {
            if (accessToken == '[object Object]') {
                $.sendMessage('Please Register, No access token is present!');
            }
            else {
                axios.post(`${API_URL}/ConfirmUser`, {
                    ConfirmationCode: registerModel.ConfirmationCode,
                    TelegramChatId: registerModel.TelegramChatId
                },
                {
                    headers: {
                        'AccessToken': accessToken
                    }
                }).then(res => {
                    if (res.data == 3) {
                        $.sendMessage('User Successfully Registered!');
                        $.sendMessage(conversationHelper.NORMAL_COMMANDS);
                    }
                    else {
                        $.runForm(userHelper.UPDATE_DRIVER_DETAILS_FORM, (result) => {
                            if (result != null) {
                                if (result.idNumber != null || result.idNumber != 0) {
                                    driverObj.IdNumber = result.idNumber;
                                }
                                driverObj.UserChatId = $.chatId;
                                driverObj.CellPhoneNumber = barcodePin;
                            }
                
                            UpdateDriverUser(driverObj, $);
                        });
                    }
                })
                .catch((error) => {
                    $.sendMessage(registrationConstants.SOMETHING_WENT_WRONG + `\n\n${error.response.data}`);
                })
            }
        });
}

async function UpdateDriverUser(driverModel, $) {
    $.getUserSession('AccessToken')
        .then((accessToken) => {
            if (accessToken == '[object Object]') {
                $.sendMessage('Please Register, No access token is present!');
            }
            else {
                axios.post(`${API_URL}/UpdateDriverDetails`, {
                    CellPhoneNumber: driverModel.CellPhoneNumber,
                    UserChatId: driverModel.UserChatId,
                    IdNumber: driverModel.IdNumber
                },
                {
                    headers: {
                        'AccessToken': accessToken
                    }
                }).then(() => {
                    $.sendMessage('User Successfully Registered!');
                    $.sendMessage(conversationHelper.DRIVER_COMMANDS);
                })
                .catch((error) => {
                    $.sendMessage(registrationConstants.SOMETHING_WENT_WRONG + `\n\n${error.response.data}`);
                })
            }
        });
}

async function RequestPickup(requestPickupModel, $) {
    $.getUserSession('AccessToken')
        .then((accessToken) => {
            if (accessToken == '[object Object]') {
                $.sendMessage('Please Register, No access token is present!');
            } 
            else {
                axios.post(`${API_URL}/AddWalletSettlement`, {
                    ExpectedAmount: requestPickupModel.ExpectedAmount,
                    UserChatId: requestPickupModel.UserChatId
                },
                {
                    headers: {
                        'AccessToken': accessToken
                    }
                }).then(res => {
                    $.sendMessage(requestPickupConstants.SUCCESS_MESSAGE);
                    $.sendMessage(userHelper.SendDriverDetails(res.data.driverDetails.name, res.data.driverDetails.otp));
                })
                .catch((error) => {
                    $.sendMessage(error.response.data);
                })
            }
        });
}

async function RequestAmountType(requestAmountObj, command,$) {
    $.getUserSession('AccessToken')
        .then((accessToken) => {
            if (accessToken == '[object Object]') {
                $.sendMessage('Please Register, No access token is present!');
            } 
            else {
                if (conversationHelper.checkWalletAmountText(command)) {
                    axios.post(`${API_URL}/GetWalletBalance`, {
                        UserChatId: requestAmountObj.UserChatId
                    },
                    {
                        headers: {
                            'AccessToken': accessToken
                        }
                    }).then(res => {
                        $.sendMessage(`The Total Amount to be Settled to you is:\n\nR${res.data.walletSettlementBalance.toFixed(2)}`);
                    })
                    .catch((error) => {
                        $.sendMessage(error.response.data);
                    });
                }
                else if (conversationHelper.checkPickupAmountText(command)){
                    axios.post(`${API_URL}/GetPickupAmount`, {
                        UserChatId: requestAmountObj.UserChatId
                    },
                    {
                        headers: {
                            'AccessToken': accessToken
                        }
                    }).then(res => {
                        $.sendMessage(`Today\'s Pickup Amount is:\n\nR${res.data.walletSettlementBalance.toFixed(2)}`);
                    })
                    .catch((error) => {
                        $.sendMessage(error.response.data);
                    });
                }
                else {
                    $.sendMessage(requestAmountConstants.SOMETHING_WENT_WRONG);
                }
            }
        });
}

async function GetMonthsPickupList(getmonthsListObj, $) {
    $.getUserSession('AccessToken')
        .then((accessToken) => {
            if (accessToken == '[object Object]') {
                $.sendMessage('Please Register, No access token is present!');
            } 
            else {
                axios.post(`${API_URL}/GetMonthsPickupList`, {
                    UserChatId: getmonthsListObj.UserChatId
                },
                {
                    headers: {
                        'AccessToken': accessToken
                    }
                }).then(res => {
                    $.sendMessage(userHelper.sendStructuredMonthsPickupList(res.data));
                })
                .catch((error) => {
                    $.sendMessage(error.response.data);
                });
            }
        });
}

module.exports = {
    RegisterUser,
    ConfirmUser,
    RequestPickup,
    RequestAmountType,
    GetMonthsPickupList
}