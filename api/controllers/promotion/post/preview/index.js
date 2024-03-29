var logger = require('@lib/logger')('promotion/post/preview'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    postModel = require('@lib/model/promotion/post');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return postModel.preview(
            local.session.team_id,
            local.session.user_id,
            event.content_id,
            pool,
            event.settings,
            local
        );
    });
}

module.exports.handler = handler;
