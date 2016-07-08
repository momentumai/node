var logger = require('@lib/logger')('/rule/list'),
    dashboardHandler = require('@lib/web/dashboard'),
    db = require('@lib/resources/db'),
    Promise = require('bluebird'),
    ds = require('@lib/resources/datastore'),
    sqlUtils = require('@lib/utils/sql'),
    path = require('path'),
    q = sqlUtils.getQueries(path.join(__dirname, 'sql'));

function runMigration (pool) {
    return db.q(q['get_campaigns'], {}, pool).then(function (rows) {
        var promises = [],
            data = [];

        rows.forEach(function (row, index) {
            if (index % 200 === 199) {
                promises.push(ds.setMulti(null, 'HistoryCampaignModel', data));
                data = [];
            }
            data.push({
                'key': [row.team_id, row.id].join('||'),
                'data': {
                    'value': JSON.stringify({'share': parseInt(row.share)})
                }
            });
        });

        return Promise.all(promises);
    }).then(function (resp) {
        console.log('Datastore response', resp);
        return db.q(q['migrate_main'], {}, pool);
    });
}

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return runMigration(pool);
    });
}

module.exports.handler = handler;