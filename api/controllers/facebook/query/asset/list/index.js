var logger = require('@lib/logger')('/facebook/query/asset/list'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    assetModel = require('@lib/model/fb-asset');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return assetModel.list(local.fb.token);
    });
}

module.exports.handler = handler;
