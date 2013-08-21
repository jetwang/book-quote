var request = require('request'),
    url = require("url"),
    cheerio = require('cheerio');
module.exports = function (app, req, list) {
    var host = "http://www.bookso.net/";
    request(url.resolve(host, "search.php?keyword=" + req.query.keyword), function (error, response, body) {
        var $ = cheerio.load(body);
        $("table.list tr").each(function () {
            var tds = $(this).find("td");
            if (tds && tds.length == 3) {
                var firstColumn = tds[0];
                var linkInFirstColumn = $(firstColumn).find("a");
                if (linkInFirstColumn.length > 0) {
                    var book = {
                        name: linkInFirstColumn.text(),
                        url: url.resolve(host, linkInFirstColumn.attr("href"))
                    };
                    list[book.name] = book;
                }
            }
        });
        req.emit("quotedOnce");
    });
};