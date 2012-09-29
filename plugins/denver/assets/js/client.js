var socket = io.connect();

socket.on("connect", function() {
    $("#chat_input").removeAttr("disabled");
});

socket.on("notice", function(msg) {
    // Notices (user join, user leave...)
    alert(msg.type);
});

socket.on("chat", function(msg) {
    // Output this somewhere. I wonder where!
});

// To send a message, socket.emit("chat", chat_input.value);