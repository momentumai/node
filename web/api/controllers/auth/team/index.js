var logger = require('@lib/logger')('auth/team'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.switchTeam(
            local.session.session_id,
            local.session.user_id,
            event.team_id,
            local.session.team_id,
            pool
        );
    });
}

module.exports.handler = handler;
