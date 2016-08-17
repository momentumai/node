var logger = require('@lib/logger')('auth/user/data/set'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    notifModel = require('@lib/model/notif');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return notifModel.fetch(
            local.session.user_id,
            event.endpoint
        );
    });
}

module.exports.handler = handler;
