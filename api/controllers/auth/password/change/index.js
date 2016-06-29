var logger = require('@lib/logger')('auth/password/change'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.changePassword(
            local.session.user_id,
            event.password,
            event.new_password,
            pool
        );
    });
}

module.exports.handler = handler;
