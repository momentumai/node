var logger = require('@lib/logger')('auth/user/forgot/setup'),
    dashboardHandler = require('@lib/web/dashboard'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.setupPassword(
            event.email,
            event.token,
            event.password,
            pool
        );
    });
}

module.exports.handler = handler;
