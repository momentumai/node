var logger = require('@lib/logger')('auth/login'),
    dashboardHandler = require('@lib/web/dashboard'),
    authModel = require('@lib/model/auth');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return authModel.login(
            event.email,
            event.password,
            local.now,
            pool
        );
    });
}

module.exports.handler = handler;
