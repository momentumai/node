var logger = require('@lib/logger')('dashboard/post/list'),
    dashboardHandler = require('@lib/web/dashboard/filter'),
    toplist = require('@lib/model/toplist');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return toplist.get(
            local.session.team_id,
            local.cats,
            local.now
        );
    });
}

module.exports.handler = handler;
