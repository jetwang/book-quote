module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('modules/index/views/index', { title: 'Express' });
    });
};
