var logger = require('@lib/logger')('auth/team/add'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        if (local.session.is_super) {
            return authModel.register(
                event.email,
                event.team_name,
                event.send_code,
                event.partner,
                event.payment_amount,
                local.now,
                pool
            );
        }
    });
}

module.exports.handler = handler;
