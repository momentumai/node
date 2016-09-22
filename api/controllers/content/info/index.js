var logger = require('@lib/logger')('/content/info'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    model = require('@lib/model/content/info');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model.get(local.session.team_id, event.content_id);
    });
}

module.exports.handler = handler;
