var logger = require('@lib/logger')('auth/logout'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.logout(
            local.session.session_id,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
