var logger = require('@lib/logger')('dashboard/content/stats'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentStatsModel = require('@lib/model/content/stats');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return contentStatsModel.get(
            local.session.team_id,
            event.content_id,
            local.now
        );
    });
}

module.exports.handler = handler;
