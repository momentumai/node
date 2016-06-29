var logger = require('@lib/logger')('/facebook/asset/get'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    assetModel = require('@lib/model/fb-asset');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return assetModel.get(
            local.session.team_id,
            local.session.user_id,
            pool
        );
    });
}

module.exports.handler = handler;
