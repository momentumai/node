var logger = require('@lib/logger')('promotion/clone'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    promotionModel = require('@lib/model/promotion');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.clone(
            local,
            event.campaign_id,
            pool
        );
    });
}

module.exports.handler = handler;
