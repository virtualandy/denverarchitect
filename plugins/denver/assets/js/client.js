var socket = io.connect(); 

socket.on("connect", function() {
    console.log('connected');
    $("#chat_input").removeAttr("disabled");
});

socket.on("notice", function(msg) {
    // Notices (user join, user leave...)
    console.log('user joined ',msg);
    $("#chat_output_container").append(msg.msg);
});

socket.on("chat", function(msg) {
    // Output this somewhere. I wonder where!
    console.log('got a message ',msg.msg);
    $("#chat_output_container").append("<br>" + msg.msg);
    //console.log($("#chat_input").value);
});

socket.on("newloc", function(data) {
    console.log("new location: ",data);
    var myFrame = $('#wheredat');
    var url = "http://wheredat.azurewebsites.net/" + '?address=' + data.address;
    $(myFrame).attr('src', url);
});

socket.on("badloc", function(data) {
    console.log("bad location resetting to default of ",data.address);
    var myFrame = $('#wheredat');
    var url = "http://wheredat.azurewebsites.net/" + '?address=' + data.address;
    $(myFrame).attr('src', url);
    $("#chat_input").val("Sorry, we couldn't find the last location. Let's try again.")
});
    
jQuery(document).ready(function($) {
    
    //$("#chat_input").focus();
    var $chat_input = $("#chat_input");
    $chat_input.on('click', function(e) {
        $chat_input.val('');
    }).on('keyup', function(e) {
        if (e.keyCode === 13) {
            console.log('enter pressed ',$chat_input.val());
            socket.emit("chatmap", $chat_input.val());
        }
    });
});

// To send a message, socket.emit("chat", chat_input.value);