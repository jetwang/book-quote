var EventEmitter = require('events').EventEmitter
    , proxyquire = require("proxyquire")
    , path = require("path");

describe("test the quote index", function () {
    it("should add books into the list", function (done) {
        var mockQuoteScripts = {};
        var mockQuoteScript = function (app, req, list) {
            //add book into the list
            list[keyCount] = "value" + keyCount;
            keyCount++;
            req.emit("quotedOnce");
        };
        mockQuoteScript["@noCallThru"] = true;
        mockQuoteScripts[path.join("app/modules/quote/models/quotescripts/bookso-cheerio.js")] = mockQuoteScript;

        var index = proxyquire('../../app/modules/quote/index.js', mockQuoteScripts);
        var keyCount = 0;
        var outputtedList = null;

        //now create some mock req, res
        var req = new EventEmitter();
        var res = {json: function (list) {
            outputtedList = list;
        }};
        var app = {
            get: function (path, handler) {
                handler(req, res);
                expect(path).toBe("/quote");
            }
        };
        var conf = {
            paths: {
                modules: "app/modules"
            }
        };
        //end of creating mock data
        runs(function () {
            index(app, conf);
        });
        waitsFor(function () {
            return outputtedList != null;//if outputtedList is not null, that means we have called res.json(list);
        }, "The emitted flag should be updated", 60 * 1000);
        runs(function () {
            expect(outputtedList[0]).toBe("value0");
//            expect(outputtedList[1]).toBe("value1");
            done();
        });
    });
});