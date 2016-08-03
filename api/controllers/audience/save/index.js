var logger = require('@lib/logger')('/audience/save'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    audienceModel = require('@lib/model/audience');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return audienceModel.save(
            local.session.team_id,
            event.id,
            event.ad_account,
            event.name,
            event.data
        );
    });
}

module.exports.handler = handler;
