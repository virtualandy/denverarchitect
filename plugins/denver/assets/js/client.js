var socket = io.connect(); 

(function($) {
    
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
        $("#chat_output_container").append(msg.msg);
        //console.log($("#chat_input").value);
    });
    
    socket.on("newloc", function(data) {
        console.log("new location: ",data);
        var myFrame = $('#wheredat');
        var url = "http://wheredat.azurewebsites.net/" + '?address=' + data.address;
        $(myFrame).attr('src', url);
    });
    
    $("#chat_output_container").text("Where did you hide the XBox?");
    var inputVal = "";
    console.log('jquery loaded');
    
    $('#chat_input_container').keypress(function (e) {
        e.preventDefault();
        if (e.which == 13) {
            console.log('enter pressed');
            socket.emit("chat", $("#chat_input").val);
        }
    });
    
    /*$('#chat_input').keyup(function(){
        this.preventDefault();
        console.log($('#chat_input').val);
    });
    
    $("#chat_input").bind('keypress', function () {
          inputVal += $(this).val();
          console.log('key up ',inputVal);
    }).bind('keyup', function() {
        console.log('emitting ',inputVal);
        socket.emit("chat", inputVal);
        inputVal = "";
    });*/
    
})(jQuery);

// To send a message, socket.emit("chat", chat_input.value);