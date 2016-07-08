var logger = require('@lib/logger')('promotion/campaign/export'),
    dashboardHandler = require(
        '@lib/web/dashboard/filter/facebook'
    ),
    promotionModel = require('@lib/model/promotion/campaign');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.export(
            local,
            event,
            pool
        );
    });
}

module.exports.handler = handler;
