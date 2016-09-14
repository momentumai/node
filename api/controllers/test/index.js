var logger = require('@lib/logger')('/test'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/fb/adset');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model.add(
            event.data.campaign,
            event.data.params,
            local.fb.token
        );
    });
}

module.exports.handler = handler;
