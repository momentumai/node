var logger = require('@lib/logger')('/facebook/asset/import'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    assetModel = require('@lib/model/fb-asset');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return assetModel.import(
            local.session.team_id,
            local.session.user_id,
            event.business_id,
            local.fb.token,
            pool
        );
    });
}

module.exports.handler = handler;
