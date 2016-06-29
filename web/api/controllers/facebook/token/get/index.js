var logger = require('@lib/logger')('facebook/token/get'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    facebookModel = require('@lib/model/facebook');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return facebookModel.get(
            local.session.team_id,
            local.session.user_id,
            pool
        );
    });
}

module.exports.handler = handler;
