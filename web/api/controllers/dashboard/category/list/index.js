var logger = require('@lib/logger')('dashboard/category/list'),
    dashboardHandler = require('@lib/web/dashboard/session'),
    categoryModel = require('@lib/model/category');

function handler (event, context) {
    dashboardHandler(event, context, logger, function (local, pool) {
        return categoryModel.list(
            local.session.team_id,
            event.parent,
            pool
        );
    });
}

module.exports.handler = handler;
