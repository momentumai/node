if (process.env.NODE_ENV === 'production') {
    require('@google/cloud-trace').start();
}

var Promise = require('bluebird'),
    Runner = require('swagger-node-runner'),
    express = require('express'),
    morgan = require('morgan'),
    app = express(),
    lambdaToExpress = require('./lambda_to_express'),
    PROJECTS = ['api', 'worker'];

function loadProjects (projects) {
    var promises = {};

    function getRunner (config) {
        return new Promise(function (resolve) {
            Runner.create(config, function (err, runner) {
                if (err) {
                    throw err;
                }
                resolve(runner);
            });
        });
    }

    projects.forEach(function (project) {
        promises[project] = lambdaToExpress(project).then(function () {
            return getRunner({
                'appRoot': __dirname,
                'swagger': project + '/swagger/swagger.yaml',
                'swaggerControllerPipe': 'swagger_controllers',
                'bagpipes': {
                    '_router': {
                        'name': 'swagger_router',
                        'mockControllersDirs': [project + '/mocks'],
                        'controllersDirs': [project + '/controllers']
                    },
                    '_swagger_validate': {
                        'name': 'swagger_validator',
                        'validateReponse': true
                    },
                    'swagger_controllers': [
                        'swagger_params_parser',
                        '_swagger_validate',
                        '_router'
                    ]
                }
            });
        });
    });

    return Promise.props(promises);
}

process.env['SUPPRESS_NO_CONFIG_WARNING'] = 1;

if (process.env['NODE_ENV'] !== 'production') {
    require('longjohn');
} else {
    app.use(morgan('combined'));
}

function normalizePort (val) {
    var port = parseInt(val);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, POST'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// eslint-disable-next-line no-unused-vars
function errorHandler (err, req, res, next) {
    if (err.statusCode === 400) {
        return res.sendStatus(400);
    }
    console.error(err);
    return res.sendStatus(500);
}

loadProjects(PROJECTS).then(function (runners) {
    Object.keys(runners).forEach(function (project) {
        runners[project].expressMiddleware().register(app);
    });
    app.use(errorHandler);
    app.listen(normalizePort(process.env.PORT || 8081));
    console.log('Running on: ', normalizePort(process.env.PORT || 8081));
});

module.exports = app;
