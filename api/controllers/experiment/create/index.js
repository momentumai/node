var logger = require('@lib/logger')('/test'),
    extend = require('extend'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/experiment/create');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model(
            extend({}, event.data, {
                'team_id': local.session.team_id
            }),
            local.fb.token
        );
    });
}

module.exports.handler = handler;
