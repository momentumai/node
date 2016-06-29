var logger = require('@lib/logger')('auth/user/data/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.listUserData(
            local.session.user_id,
            pool
        );
    });
}

module.exports.handler = handler;
