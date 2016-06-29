var logger = require('@lib/logger')('promotion/autoschedule'),
    dashboardHandler = require('@lib/web/dashboard/cats'),
    promotionModel = require('@lib/model/promotion');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return promotionModel.autoschedule(
            local.session.team_id,
            local.cats,
            event.content_id,
            pool
        );
    });
}

module.exports.handler = handler;
