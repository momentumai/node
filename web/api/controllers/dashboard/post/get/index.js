var logger = require('@lib/logger')('dashboard/post/get'),
    dashboardHandler = require('@lib/web/dashboard/interval/filter'),
    contentModel = require('@lib/model/content');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentModel.get(
            local.session.team_id,
            local.now,
            local.interval,
            event.url,
            local.cats,
            pool
        );
    });
}

module.exports.handler = handler;
