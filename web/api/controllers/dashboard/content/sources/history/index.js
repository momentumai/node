var logger = require('@lib/logger')('dashboard/content/sources/history'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentSourcesModel = require('@lib/model/content/sources');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return contentSourcesModel.history(
            local.session.team_id,
            event.content_id
        );
    });
}

module.exports.handler = handler;
