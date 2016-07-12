var extend = require('extend'),
    path = require('path'),
    execFile = require('child_process').execFile,
    Promise = require('bluebird');

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

module.exports = function (basePath) {
    return new Promise(function (resolve) {
        execFile('find', [
            path.join(__dirname, basePath),
            '-name',
            'index.js'
        ], function (err, stdout) {
            var fileList = stdout.split('\n');

            if (err) {
                throw err;
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
                                res.json(result);
                            },
                            'fail': function (err) {
                                var msg,
                                    code;

                                console.error(err.stack || err);

                                msg = err && err.toString() || '';
                                code = Number(msg.split(':')[1]);

                                if (code === 401) {
                                    res.json({
                                        'errorMessage': msg
                                    });
                                } else {
                                    res.status(code || 500);
                                }
                            }
                        });
                    };
                }
            });
            resolve();
        });
    });
};
