var logger = require('@lib/logger')('auth/team/payment/set'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    adminModel = require('@lib/model/admin');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        if (local.session.is_super) {
            return adminModel.setPayment(
                local.session.team_id,
                event.amount,
                pool
            );
        }
    });
}

module.exports.handler = handler;
