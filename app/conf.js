module.exports = function (app) {
    var path = require('path');
    conf = {};

    conf.package_json = require('./package.json');

    conf.jsonpCallbackName = 'jsonpcb';

    conf.routePrefix = '/';
//conf.routePrefix          = '/v1/wbe/';

    conf.paths = {};
    conf.paths.logFile = path.join(__dirname, 'logs', conf.APP_NAME + '-node.log');

    conf.paths.public = path.join(__dirname, '..', 'public');

    conf.paths.data = path.join(__dirname, 'data');
    conf.paths.utils = path.join(__dirname, 'utils');
    conf.paths.modules = path.join(__dirname, 'modules');
    app.conf = conf;
};