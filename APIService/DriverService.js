'use-strict';
require('dotenv').config();

const { API_URL} = process.env;
const axios = require('axios');

const conversationConstants = require('../Constants/ConversationConstants');
const startPickupConstants = conversationConstants.START_PICKUP;

const driverHelper = require('../Helpers/DriverHelper');

async function DepartFromOffice($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        axios.post(`${API_URL}/DepartFromOffice`, {},
        {
            headers: {
                'AccessToken': accessToken
            }
        }).then(res => {
            if (res.data) {
                $.runForm(driverHelper.ARRIVED_AT_SITE_FORM, (result) => {
                    if (result) {
                        ArrivedAtSite($);
                    }
                })
            }
        })
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.LEAVING_OFFICE_FORM, (result) => {
                if (result) {
                    DepartFromOffice($);;
                }
            })
        })
    });
}

async function ArrivedAtSite($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
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
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.ARRIVED_AT_SITE_FORM, (result) => {
                if (result) {
                    ArrivedAtSite($);
                }
            })
        })
    });
}

async function ConfirmDriver($, otp) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
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
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.CONFIRM_DRIVER_FORM, (result) => {
                if (result != null) {
                    ConfirmDriver($, result.otp);
                }
            })
        })
    });
}

async function SendBagPickupBarcode($, barcode) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        axios.post(`${API_URL}/SendBagPickupBarcode`, {
            Barcode: barcode
        },
        {
            headers: {
                'AccessToken': accessToken
            }
        }).then(res => {
            if (res.data) {
                $.runForm(driverHelper.LEAVING_SITE_FORM, (result) => {
                    if (result) {
                        DepartFromSite($);
                    }
                })
            }
        })
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.SCAN_BARCODE_FORM, (result) => {
                if (result != null) {
                    SendBagPickupBarcode($, result.barcode);
                }
            })
        })
    });
}

async function DepartFromSite($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        axios.post(`${API_URL}/DepartFromClient`, {},
        {
            headers: {
                'AccessToken': accessToken
            }
        }).then(res => {
            if (res.data) {
                $.runForm(driverHelper.ARRIVED_AT_OFFICE_FORM, (result) => {
                    if (result) {
                        ArrivedAtOffice($);
                    }
                })
            }
        })
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.LEAVING_SITE_FORM, (result) => {
                if (result) {
                    DepartFromSite($);
                }
            })
        })
    });
}

async function ArrivedAtOffice($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
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
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
            $.runForm(driverHelper.ARRIVED_AT_OFFICE_FORM, (result) => {
                if (result) {
                    ArrivedAtOffice($);
                }
            })
        })
    });
}

async function RequestPickupLocation($) {
    $.getUserSession('AccessToken')
    .then((accessToken) => {
        axios.post(`${API_URL}/GetDriverOrderDetails`, {},
        {
            headers: {
                'AccessToken': accessToken
            }
        }).then(res => {
            $.sendMessage(driverHelper.SendWalletLocation(res.data.clientName, res.data.walletAddress.addressLineOne, res.data.walletAddress.addressLineTwo));
        })
        .catch(() => {
            $.sendMessage(startPickupConstants.SOMETHING_WENT_WRONG);
        })
    });
}

module.exports = {
    DepartFromOffice,
    ArrivedAtSite,
    ConfirmDriver,
    SendBagPickupBarcode,
    DepartFromSite,
    ArrivedAtOffice,
    RequestPickupLocation
}