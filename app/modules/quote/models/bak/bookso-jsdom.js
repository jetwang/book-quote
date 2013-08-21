var jsdom = require("jsdom");

module.exports = function (app, req, list) {
    jsdom.env(
        "http://www.bookso.net/search.php?keyword=" + req.query.keyword,
        ["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            var $ = window.$;
            $("table.list tbody tr").each(function (tr) {
                var tds = $(tr).find("td");
                if (tds && tds.length == 3) {
                    var book = {
                        name: tds.get(0).children("a").text(),
                        url: tds.get(0).children("a").href()
                    };
                    list.add(book);
                }
            });
            req.emit("quotedOnce");
        }
    );
};