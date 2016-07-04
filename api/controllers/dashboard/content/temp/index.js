var logger = require('@lib/logger')('dashboard/content/info'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentPublicInfoModel = require('@lib/model/content/public-info');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return contentPublicInfoModel.get(
            local.session.team_id,
            event.url
        );
    });
}

module.exports.handler = handler;
