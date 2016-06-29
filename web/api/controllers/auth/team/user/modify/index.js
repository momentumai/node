var logger = require('@lib/logger')('auth/team/user/modify'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.switchAdminState(
            local.session.team_id,
            local.session.is_admin,
            event.user_id,
            event.state,
            pool
        );
    });
}

module.exports.handler = handler;
