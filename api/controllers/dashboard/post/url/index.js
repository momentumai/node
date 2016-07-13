var logger = require('@lib/logger')('dashboard/post/url'),
    dashboardHandler = require('@lib/web/dashboard/filter'),
    contentList = require('@lib/model/content/list');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentList.url(
            local.session.team_id,
            event.url,
            local.cats,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
