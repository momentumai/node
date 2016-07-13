var logger = require('@lib/logger')('dashboard/post/url'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    contentList = require('@lib/model/content/list');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return contentList.url(
            local.session.team_id,
            event.url
        );
    });
}

module.exports.handler = handler;
