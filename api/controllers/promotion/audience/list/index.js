var logger = require('@lib/logger')('promotion/audience/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    auidenceModel = require('@lib/model/promotion/audience');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return auidenceModel.list(
            local.fb.token,
            event.ad_account
        );
    });
}

module.exports.handler = handler;
