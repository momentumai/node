var logger = require('@lib/logger')('auth/user/remove'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.removeUser(
            local.session.user_id,
            local.session.team_id,
            event.user_id,
            local.session.is_admin,
            pool
        );
    });
}

module.exports.handler = handler;
