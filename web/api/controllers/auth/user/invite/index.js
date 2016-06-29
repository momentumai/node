var logger = require('@lib/logger')('auth/user/invite'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.inviteUser(
            local.session.user_id,
            local.session.team_id,
            event.email,
            local.session.is_admin,
            pool
        );
    });
}

module.exports.handler = handler;
