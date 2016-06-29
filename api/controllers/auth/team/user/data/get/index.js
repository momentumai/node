var logger = require('@lib/logger')('auth/team/user/data/get'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.getTeamUserData(
            local.session.team_id,
            local.session.user_id,
            event.key,
            pool
        );
    });
}

module.exports.handler = handler;
