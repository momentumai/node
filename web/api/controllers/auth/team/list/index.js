var logger = require('@lib/logger')('auth/team/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.getTeams(
            local.session.session_id,
            local.session.user_id,
            local.session.is_super,
            pool
        );
    });
}

module.exports.handler = handler;
