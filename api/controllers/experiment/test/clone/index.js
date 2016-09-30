var logger = require('@lib/logger')('/experiment/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/experiment/test/clone');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model({
            'team_id': local.session.team_id,
            'id': event.id
        },
            local.fb.token
        );
    });
}

module.exports.handler = handler;
