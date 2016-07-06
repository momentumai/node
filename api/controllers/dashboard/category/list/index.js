var logger = require('@lib/logger')('dashboard/category/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    filterModel = require('@lib/model/filter');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local) {
        return filterModel.list(
            local.session.team_id
        );
    });
}

module.exports.handler = handler;
