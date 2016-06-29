var logger = require('@lib/logger')('promotion/ogdata'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    postModel = require('@lib/model/promotion/post');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return postModel.ogdata(
            local.session.team_id,
            event.content_id,
            pool
        );
    });
}

module.exports.handler = handler;
