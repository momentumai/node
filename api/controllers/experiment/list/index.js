var logger = require('@lib/logger')('/experiment/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/experiment/list');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model({
            'team_id': local.session.team_id,
            'cats': local.cats,
            'limit': event.limit,
            'offset': event.offset
        },
            local.fb.token
        );
    });
}

module.exports.handler = handler;
