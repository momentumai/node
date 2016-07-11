var logger = require('@lib/logger')('dashboard/post/list'),
    dashboardHandler = require('@lib/web/dashboard/filter'),
    contentList = require('@lib/model/content/list');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentList.get(
            local.session.team_id,
            local.cats,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
