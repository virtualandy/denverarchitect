module.exports = function setup(options, imports, register) {

var httpserver = imports.httpserver;

var rootOptions = {
    pageTitle : "Hello Denver",
    plugin : "denver"
};

httpserver.addStaticRoute(__dirname + "/../denver/assets");

httpserver.registerRoute("get", "/", function(req, res) {
    res.render("../denver/templates/index.ejs", rootOptions);
});

var app = httpserver.getServer();
var io = require("socket.io").listen(app);
io.configure(function() {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
    io.set("log level", 1);
});


io.sockets.on("connection", function(socket) {
    var id = socket.id;
    socket.emit("notice", {
        msg : "Hello"
    });

    io.sockets.emit("notice", {
      type : "userjoin",
      id : id
    });

    socket.on("chat", function(data) {
        io.sockets.emit("chat", {
            id: id,
            msg: data
        });
    });
});

register(null, {});

};