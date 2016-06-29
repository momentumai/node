var logger = require('@lib/logger')('dashboard/post/recommended/list'),
    dashboardHandler = require('@lib/web/dashboard/interval/filter'),
    contentModel = require('@lib/model/content');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return contentModel.recommended(
            local.session.team_id,
            local.now,
            local.interval,
            event.limit,
            local.cats,
            pool
        );
    });
}

module.exports.handler = handler;
