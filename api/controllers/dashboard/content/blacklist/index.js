var logger = require('@lib/logger')('dashboard/content/blacklist'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentBlacklistModel = require('@lib/model/content/blacklist');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return contentBlacklistModel.update(
            local.session.team_id,
            event.url,
            event.blacklist
        );
    });
}

module.exports.handler = handler;
