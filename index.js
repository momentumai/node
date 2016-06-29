var path = require('path'),
    Runner = require('swagger-node-runner'),
    express = require('express'),
    morgan = require('morgan'),
    app = express(),
    transformToExpress = require('./web/transform'),
    config = {
        'appRoot': path.join(
            __dirname,
            'web'
        )
    };

function normalizePort(val) {
  var port = parseInt(val, 10);

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

app.use(morgan('combined'));
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

transformToExpress(function () {
    Runner.create(config, function (err, runner) {
        if (err) {
            throw err;
        }

        runner.expressMiddleware().register(app);

        // eslint-disable-next-line no-unused-vars
        app.use(function (err, req, res, next) {
            if (err instanceof SyntaxError || err.statusCode === 400) {
                return res.sendStatus(400);
            }
            return res.sendStatus(500);
        });

        app.listen(normalizePort(process.env.PORT || 8081));
    });
});

module.exports = app;