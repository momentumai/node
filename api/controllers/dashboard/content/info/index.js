var logger = require('@lib/logger')('dashboard/content/info'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentInfoModel = require('@lib/model/content/info');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentInfoModel.get(
            local.session.team_id,
            event.content_id,
            pool
        );
    });
}

module.exports.handler = handler;
