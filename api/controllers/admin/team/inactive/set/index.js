var logger = require('@lib/logger')('auth/team/inactive/set'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    adminModel = require('@lib/model/admin');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        if (local.session.is_super) {
            return adminModel.setInactive(
                local.session.team_id,
                event.status
            );
        }
    });
}

module.exports.handler = handler;
