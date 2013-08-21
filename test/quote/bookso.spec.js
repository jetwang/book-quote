jasmine.getEnv().TimeoutInterval = 10 * 1000;
describe("test bookso quote script", function () {
    it("should add books into the list", function (done) {
        var quote = require('../../app/modules/quote/models/quotescripts/bookso-cheerio.js');
        var emitted = false;
        var keyword = "天下";
        var req = {
            query: {
                keyword: keyword
            }, emit: function () {
                emitted = true;
            }
        };
        var list = {};

        runs(function () {
            quote({}, req, list);
        });
        waitsFor(function () {
            return emitted;
        }, "The emitted flag should be updated", 60 * 1000);

        runs(function () {
            for (bookName in list) {
                var book = list[bookName];
                expect(book.name.indexOf(keyword) >= 0).toBe(true);
                expect(book.url.indexOf("http") === 0).toBe(true);
            }
            done();
        });
    });
});