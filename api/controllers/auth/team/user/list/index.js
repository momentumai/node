var logger = require('@lib/logger')('auth/team/user/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.getUsers(
            local.session.user_id,
            local.session.team_id,
            pool
        );
    });
}

module.exports.handler = handler;
