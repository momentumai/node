var logger = require('@lib/logger')('worker/crawler'),
    crawlerHandler = require('@lib/worker/crawler');

function handler (event, context) {
    return crawlerHandler(event, context, logger);
}

module.exports.handler = handler;
