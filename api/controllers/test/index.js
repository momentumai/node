var logger = require('@lib/logger')('/test'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    model = require('@lib/model/fb/campaign');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        console.log(local);
        return model.addGet(
            local.session.team_id,
            local.cats,
            event.data.ad_account,
            local.fb.token
        );
    });
}

module.exports.handler = handler;
