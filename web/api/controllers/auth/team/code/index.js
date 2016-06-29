var logger = require('@lib/logger')('auth/team/code'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return authModel.getCode(
            local.session.team_id
        );
    });
}

module.exports.handler = handler;
