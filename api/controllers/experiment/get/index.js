var logger = require('@lib/logger')('/experiment/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/experiment/get');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model({
            'team_id': local.session.team_id,
            'content_id': event.content_id
        },
            local.fb.token
        );
    });
}

module.exports.handler = handler;
