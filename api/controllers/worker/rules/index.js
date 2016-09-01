var logger = require('@lib/logger')('/worker/rules'),
    resources = require('@lib/resources'),
    rulesModel = require('@lib/worker/rules/handler'),
    config = require('@config');

function handler (event, context) {
    var local = {};

    if (event.access_token !== config.workerToken) {
        return context.succeed({});
    }

    resources.get().then(function (resources) {
        local.r = resources;
        return rulesModel(
            event,
            local,
            logger
        );
    }).then(function (res) {
        if (res) {
            logger.info(res);
        }
        local.res = res || {};
    }).catch(function (err) {
        if (err) {
            logger.error(err);
        }
        local.err = err || 'err';
    }).finally(function () {
        return resources.dispose(local.r).then(function () {
            if (local.err) {
                return context.fail(local.err);
            }
            return context.succeed(local.res);
        });
    });
}

module.exports.handler = handler;
