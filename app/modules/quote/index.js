var path = require('path')
    , fs = require('fs');
module.exports = function (app, conf) {
    const QUOTE_SCRIPTS_FOLDER = path.join(conf.paths.modules, "quote/models/quotescripts");
    var pendingQuoteScriptCount = 0;

    app.get("/quote", function (req, res) {
        fs.readdir(QUOTE_SCRIPTS_FOLDER, function (err, files) {
            var list = {};
            pendingQuoteScriptCount = files.length;

            req.addListener("quotedOnce", function () {
                pendingQuoteScriptCount--;
                if (pendingQuoteScriptCount <= 0) {
                    res.json(list);
                }
            });

            files.forEach(function (file) {
                var quote = require(path.join(QUOTE_SCRIPTS_FOLDER, file));
                quote(app, req, list);
            });
        });
    });
};