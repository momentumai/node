var logger = require('@lib/logger')('auth/team/payment/get'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    adminModel = require('@lib/model/admin');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        if (local.session.is_super) {
            return adminModel.getPayment(
                local.session.team_id,
                pool
            );
        }
    });
}

module.exports.handler = handler;
