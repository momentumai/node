var logger = require('@lib/logger')('/experiment/list'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    editModel = require('@lib/model/experiment/edit'),
    getModel = require('@lib/model/experiment/get');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return editModel({
            'team_id': local.session.team_id,
            'content_id': event.content_id,
            'data': event.data
        },
            local.fb.token
        ).then(function () {
            return getModel({
                'team_id': local.session.team_id,
                'content_id': event.content_id
            },
                local.fb.token
            );
        });
    });
}

module.exports.handler = handler;
