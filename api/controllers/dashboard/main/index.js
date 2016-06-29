var logger = require('@lib/logger')('dashboard/main'),
    dashboardHandler = require('@lib/web/dashboard/session/filter'),
    statsModel = require('@lib/model/page/stats');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return statsModel.get(
            local.session.team_id,
            local.cats,
            local.now
        );
    });
}

module.exports.handler = handler;
