var logger = require('@lib/logger')('promotion/campaign/list'),
    dashboardHandler = require(
        '@lib/web/dashboard/filter/facebook'
    ),
    promotionModel = require('@lib/model/promotion/campaign');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.saveCampaign(
            local,
            event,
            pool
        );
    });
}

module.exports.handler = handler;
