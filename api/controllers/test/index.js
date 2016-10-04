var logger = require('@lib/logger')('/test'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/experiment/getWinner');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model({
            'team_id': local.session.team_id,
            'content_id': event.data.content_id
        }, local.fb.token);
    });
}

module.exports.handler = handler;
