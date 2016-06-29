var extend = require('extend'),
    path = require('path'),
    execFile = require('child_process').execFile;

function parseParams (params) {
    var ret = {};

    Object.keys(params).forEach(function (name) {
        if (typeof params[name].value === 'object') {
            extend(true, ret, parseParams(params[name].value));
        } else if (typeof params[name].value !== 'undefined') {
            ret[name] = params[name].value;
        } else if (params[name].constructor.name !== 'ParameterValue') {
            ret[name] = params[name];
        }
    });

    return ret;
}

module.exports = function (callback) {
    execFile('find', [
        path.join(__dirname, 'api'),
        '-name',
        'index.js'
    ], function (err, stdout) {
        var fileList = stdout.split('\n');

        if (err) {
            return callback(err);
        }

        fileList.forEach(function (file) {
            var module;

            if (file) {
                module = require(file);
                module.post = module.options = function router (req, res) {
                    var params = parseParams(req.swagger.params);

                    module.handler(params, {
                        'done': function (err, result) {
                            if (err) {
                                res.json({
                                    'errorMessage': err && err.toString()
                                });
                            } else {
                                res.json(result);
                            }
                        },
                        'succeed': function (result) {
                            /* for testing */
                            /*if (Math.floor(Math.random() * 3) === 2) {
                                res.status(500);
                            }*/
                            res.json(result);
                        },
                        'fail': function (err) {
                            res.json({
                                'errorMessage': err && err.toString()
                            });
                        }
                    });
                };
            }
        });
        callback();
    });
};
