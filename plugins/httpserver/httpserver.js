module.exports = function setup(options, imports, register) {
    var express = require("express");

    // Setup the Express.js server
    var app = express();

    app.set("views", __dirname + "/");
    app.set("view engine", "ejs");
    app.set("view options", {
        layout: false
    });

    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.session({
        secret: "skjghskdjfhbqigohqdiouk"
    }));

    register(null, {
        httpserver: {
            registerRoute : function(requestType, route, callback) {
                app[requestType](route, callback);
            },
            
            addStaticRoute : function(route) {
                app.use(express.static(route));
            }
        }
    });

    app.listen(options.port, options.host);
    console.log("Listening on " + options.host + ":" + options.port);
};