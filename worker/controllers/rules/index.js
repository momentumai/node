var logger = require('@lib/logger')('worker/rules'),
    rulesHandler = require('@lib/worker/rules');

function handler (event, context) {
    return rulesHandler(event, context, logger);
}

module.exports.handler = handler;
