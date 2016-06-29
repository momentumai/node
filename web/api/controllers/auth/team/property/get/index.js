var logger = require('@lib/logger')('/team/property/get'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    propertyModel = require('@lib/model/team/property');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return propertyModel.list(
            local.session.team_id,
            event.key,
            pool
        );
    });
}

module.exports.handler = handler;
