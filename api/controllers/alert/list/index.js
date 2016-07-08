var logger = require('@lib/logger')('alert/list'),
    dashboardHandler = require('@lib/web/dashboard/filter'),
    alertModel = require('@lib/model/alert');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return alertModel.list(
            local.session.team_id,
            local.cats,
            event.time,
            pool
        );
    });
}

module.exports.handler = handler;
