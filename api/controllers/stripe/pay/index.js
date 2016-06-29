var logger = require('@lib/logger')('stripe/pay'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    stripeModel = require('@lib/model/stripe');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return stripeModel.pay(
            local.session.team_id,
            local.session.user_id,
            event.info || {},
            event.token,
            pool
        );
    });
}

module.exports.handler = handler;
