var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , jsdom = require('jsdom')
    , path = require('path');

var app = express();

require("./conf.js")(app);
var conf = app.conf;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

fs.readdir(conf.paths.modules, function (err, files) {
    files.forEach(function (file) {
        var route = require(conf.paths.modules + "/" + file);
        route(app);
    });
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
