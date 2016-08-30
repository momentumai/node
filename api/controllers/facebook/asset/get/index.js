var logger = require('@lib/logger')('/facebook/asset/get'),
    dashboardHandler = require('@lib/web/dashboard/filter/facebook'),
    assetModel = require('@lib/model/fb-asset');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return assetModel.get(
            local.fb.token
        );
    });
}

module.exports.handler = handler;
