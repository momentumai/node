var logger = require('@lib/logger')('promotion/create'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    promotionModel = require('@lib/model/promotion');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.create(
            local,
            event.content_id,
            event.settings || {},
            pool
        );
    });
}

module.exports.handler = handler;
