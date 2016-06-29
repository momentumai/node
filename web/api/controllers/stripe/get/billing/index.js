var logger = require('@lib/logger')('stripe/get/billing'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    stripeModel = require('@lib/model/stripe');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return stripeModel.getBilling(
            local.session.team_id,
            pool
        );
    });
}

module.exports.handler = handler;
