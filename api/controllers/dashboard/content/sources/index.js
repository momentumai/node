var logger = require('@lib/logger')('dashboard/content/sources'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentSourcesModel = require('@lib/model/content/sources');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentSourcesModel.get(
            local.session.team_id,
            event.content_id,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
