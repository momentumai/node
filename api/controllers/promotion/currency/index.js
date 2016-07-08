var logger = require('@lib/logger')('promotion/currency'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    currencyModel = require('@lib/model/promotion/currency');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return currencyModel.get(
            local.fb.token,
            event.ad_account
        );
    });
}

module.exports.handler = handler;
