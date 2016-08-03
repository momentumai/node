var logger = require('@lib/logger')('/audience/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    audienceModel = require('@lib/model/audience');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return audienceModel.list(local.session.team_id);
    });
}

module.exports.handler = handler;
