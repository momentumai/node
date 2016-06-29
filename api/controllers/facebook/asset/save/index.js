var logger = require('@lib/logger')('/facebook/asset/save'),
    dashboardHandler = require('@lib/web/dashboard/session/facebook'),
    assetModel = require('@lib/model/fb-asset'),
    Promise = require('bluebird');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return Promise.resolve().then(function () {
            if (event.manual) {
                return assetModel.insert(
                    local.session.team_id,
                    local.session.user_id,
                    event.manual.values || [],
                    local.fb.token,
                    pool
                );
            }
        }).then(function () {
            return assetModel.get(
                local.session.team_id,
                local.session.user_id,
                pool
            );
        });
    });
}

module.exports.handler = handler;
