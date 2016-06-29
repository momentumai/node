var logger = require('@lib/logger')('/rule/save'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    ruleModel = require('@lib/model/rule');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return ruleModel.save(
            local.session.user_id,
            local.session.team_id,
            local.session.is_admin,
            event.data,
            pool
        );
    });
}

module.exports.handler = handler;
