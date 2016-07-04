var logger = require('@lib/logger')('dashboard/content/info'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    model = require('@lib/model/filter');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model.list(
            local.session.team_id
        );
    });
}

module.exports.handler = handler;
