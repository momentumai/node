var logger = require('@lib/logger')('facebook/token'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    facebookModel = require('@lib/model/facebook');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return facebookModel.token(
            local.session.team_id,
            local.session.user_id,
            local.session.is_admin,
            event.access_token,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
