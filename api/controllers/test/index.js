var logger = require('@lib/logger')('/test'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/fb/ad');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return model.add(
            event.data.adset,
            event.data.adcreative,
            event.data.params,
            local.fb.token
        );
    });
}

module.exports.handler = handler;
