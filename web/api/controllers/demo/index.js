var logger = require('@lib/logger')('/demo'),
    path = require('path'),
    fs = require('fs');

function setState (json, url, state) {
    var contentMap = {
        'dashboard/post/list': function () {
            if (state.promoted) {
                json.data[0].promoted = 1;
            }
        },
        'promotion/campaign/list': function () {
            if (state.promoted) {
                json.data[0].active = true;
            }
        }
    };

    state = state || {};

    contentMap[url] && contentMap[url]();
}

function handler (event, context) {
    var json = null;

    try {
        json = JSON.parse(
            fs.readFileSync(
                path.join(
                    __dirname,
                    'json',
                    event.url.replace(/\//g, '_') +
                        '.json'
                )
            ).toString('utf8')
        );
    } catch (e) {
        logger.error(e);
        return context.fail(e);
    }

    setState(json, event.url, event.state);

    context.succeed(json);
}

module.exports.handler = handler;
