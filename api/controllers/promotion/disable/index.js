var logger = require('@lib/logger')('promotion/disable'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    promotionModel = require('@lib/model/promotion');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.endPromotion(
            local.session.team_id,
            event.campaign_id,
            local.fb,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
