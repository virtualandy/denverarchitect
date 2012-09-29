module.exports = function setup(options, imports, register) {

var httpserver = imports.httpserver;

var rootOptions = {
    pageTitle : "NodeDenver - virtualandy",
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

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('ff498607b371672bb7fc60a1d736d0e66e0266e9');

function getAlchemy(inputText) {
    console.log("paging alchemy for info on ",inputText);
    alchemy.entities(inputText, {}, function(err, response) {
      if (err) throw err;
    
      // See http://www.alchemyapi.com/api/ for format of returned object
      var entities = response.entities;
      console.log("response ",response.status," how many entities did we get? ", entities.length);    
    
      // Do something with data
      console.log(entities);
      console.log("you talked about the ",entities[0].type," of ",entities[0].text);
      
      io.sockets.emit("newloc", { "address" : entities[0].text });
    });
}

io.sockets.on("connection", function(socket) {
    var id = socket.id;
    socket.emit("notice", {
        msg : "Where did you hide the XBox?"
    });

    io.sockets.emit("notice", {
      type : "userjoin",
      id : id
    });

    socket.on("chat", function(data) {
        console.log("received chat data: ", data);
        io.sockets.emit("chat", {
            id: id,
            msg: data
        });
    });
    
    socket.on("getalch", function(data) {
        console.log("getalch socket received ",data);
        getAlchemy(data);
    });
});

register(null, {});

};