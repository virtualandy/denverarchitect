module.exports = function setup(options, imports, register) {

var httpserver = imports.httpserver;

var rootOptions = {
    pageTitle : "Hello Denver",
    plugin : "denver"
};

httpserver.addStaticRoute(__dirname + "/../developer/assets");

httpserver.registerRoute("get", "/", function(req, res) {
    res.render("../developer/templates/index.jade", rootOptions, function(err, html) {
        rootOptions.content = html;
        res.render("layout_bare.jade", rootOptions);
    });
});

register(null, {});

};