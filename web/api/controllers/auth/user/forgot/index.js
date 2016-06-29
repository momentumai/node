var logger = require('@lib/logger')('auth/user/forgot'),
    dashboardHandler = require('@lib/web/dashboard'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.forgotPassword(
            event.email,
            pool
        );
    });
}

module.exports.handler = handler;
