var Browser = require("zombie");
module.exports = function (app, req, list) {
    browser = new Browser();
    browser.visit("http://www.8shu.net/search.php?w=" + req.query.keyword,
        {debug: true, runScripts: true,
            userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.55 Safari/537.36"})
        .then(function () {
            var document = browser.window.document;
            var links = document.querySelectorAll("div.box > div.picbox > a");
            if (links.length > 0) {
                links.each(function (link) {
                    var book = {
                        name: link.title,
                        url: link.href,
                        logo: link.querySelector("img").src
                    };
                    list.add(book);
                });
            }
            req.emit("quotedOnce");
        })
        .fail(function (error) {
            req.emit("quotedOnce");
        });
};