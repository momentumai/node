var logger = require('@lib/logger')('auth/team/user/data/set'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.setTeamUserData(
            local.session.team_id,
            local.session.user_id,
            event.key,
            event.value,
            pool
        );
    });
}

module.exports.handler = handler;
