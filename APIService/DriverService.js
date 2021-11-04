'use-strict';
require('dotenv').config();

const { API_URL} = process.env;
const axios = require('axios');

const conversationConstants = require('../Constants/ConversationConstants');
const startPickupConstants = conversationConstants.START_PICKUP;

const driverHelper = require('../Helpers/DriverHelper');

async function AvailableOrders($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/AvailableOrders`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    $.sendMessage(startPickupConstants.PICKUP_STARTED);
                    LeavingOfficeMenu($);
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
            })
        }
    });
}

async function LeavingOfficeMenu($) {
    $.runMenu({
		message: startPickupConstants.LEAVING_OFFICE_QUESTION,
		oneTimeKeyboard: true,
		options: {
			parse_mode: 'Markdown',
		},
		layout: [2],
		'Yes': async () => {
			DepartFromOffice($);
		},
		'No': async () => {
			LeavingOfficeMenu($);
		}, 
	})
}

async function DepartFromOffice($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/DepartFromOffice`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    ArrivedAtSiteMenu($);
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                LeavingOfficeMenu($);
            })
        }
    });
}

async function ArrivedAtSiteMenu($) {
    $.runMenu({
		message: startPickupConstants.ARRIVED_AT_SITE_QUESTION,
		oneTimeKeyboard: true,
		options: {
			parse_mode: 'Markdown',
		},
		layout: [2],
		'Yes': async () => {
			ArrivedAtSite($);
		},
		'No': async () => {
			ArrivedAtSiteMenu($);
		}, 
	})
}

async function ArrivedAtSite($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/AriveAtClient`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    $.runForm(driverHelper.CONFIRM_DRIVER_FORM, (result) => {
                        if (result != null) {
                            ConfirmDriver($, result.otp);
                        }
                    })
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                ArrivedAtSiteMenu($);
            })
        }
    });
}

async function ConfirmDriver($, otp) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/ConfirmDriverOrder`, {
                OTP: otp
            },
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    $.runForm(driverHelper.SCAN_BARCODE_FORM, (result) => {
                        if (result != null) {
                            SendBagPickupBarcode($, result.barcode);
                        }
                    })
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                $.runForm(driverHelper.CONFIRM_DRIVER_FORM, (result) => {
                    if (result != null) {
                        ConfirmDriver($, result.otp);
                    }
                })
            })
        }
    });
}

async function SendBagPickupBarcode($, barcode) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/SendBagPickupBarcode`, {
                Barcode: barcode
            },
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    DepartFromSiteMenu($);
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                $.runForm(driverHelper.SCAN_BARCODE_FORM, (result) => {
                    if (result != null) {
                        SendBagPickupBarcode($, result.barcode);
                    }
                })
            })
        }
    });
}

async function DepartFromSiteMenu($) {
    $.runMenu({
		message: startPickupConstants.LEAVING_SITE_QUESTION,
		oneTimeKeyboard: true,
		options: {
			parse_mode: 'Markdown',
		},
		layout: [2],
		'Yes': async () => {
			DepartFromSite($);
		},
		'No': async () => {
			DepartFromSiteMenu($);
		}, 
	})
}

async function DepartFromSite($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/DepartFromClient`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    ArriveAtOfficeMenu($);
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                DepartFromSiteMenu($);
            })
        }
    });
}

async function ArriveAtOfficeMenu($) {
    $.runMenu({
		message: startPickupConstants.ARRIVED_AT_OFFICE_QUESTION,
		oneTimeKeyboard: true,
		options: {
			parse_mode: 'Markdown',
		},
		layout: [2],
		'Yes': async () => {
			ArrivedAtOffice($);
		},
		'No': async () => {
			ArriveAtOfficeMenu($);
		}, 
	})
}

async function ArrivedAtOffice($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/AriveAtOffice`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                if (res.data) {
                    $.sendMessage(startPickupConstants.PICKUP_ENDED);
                }
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
                ArriveAtOfficeMenu($);
            })
        }
    });
}

async function RequestPickupLocation($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        if (accessToken == '[object Object]') {
            $.sendMessage('Please Register, No access token is present!');
        }
        else {
            axios.post(`${API_URL}/GetDriverOrderDetails`, {},
            {
                headers: {
                    'AccessToken': accessToken
                }
            }).then(res => {
                $.sendMessage(driverHelper.SendWalletLocation(res.data.clientName, res.data.walletAddress.addressLineOne, res.data.walletAddress.addressLineTwo));
            })
            .catch((error) => {
                $.sendMessage(error.response.data);
            })
        }
    });
}

module.exports = {
    AvailableOrders,
    LeavingOfficeMenu,
    DepartFromOffice,
    ArrivedAtSite,
    ConfirmDriver,
    SendBagPickupBarcode,
    DepartFromSite,
    ArrivedAtOffice,
    RequestPickupLocation
}