var logger = require('@lib/logger')('/rule/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    ruleModel = require('@lib/model/rule');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return ruleModel.list(
            local.session.user_id,
            local.session.team_id,
            pool
        );
    });
}

module.exports.handler = handler;
