var logger = require('@lib/logger')('/experiment/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    editModel = require('@lib/model/experiment/test/edit');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return editModel({
            'team_id': local.session.team_id,
            'id': event.id,
            'data': event.data
        },
            local.fb.token
        );
    });
}

module.exports.handler = handler;
