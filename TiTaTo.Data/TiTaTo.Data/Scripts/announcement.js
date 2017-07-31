var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");
var activeChatRoom;
var roomLastUpdated;

function initalizeAnnouncement() {
    console.log("Start!");

    var chatHub = $.connection.chatHub;
    $.connection.hub.logging = true;
    $.connection.hub.start();

    chatHub.client.broadcastMessage = function (message) {
        console.log(message);
        $("#divMessages").append("<p>" + message + "</p>");
    };

    $("#formMessage").submit(function (e) {
        var name = Cookie.Get("Name");
        if (name === null || name === undefined || name === "") {
            name = "John Doe";
        }

        var message = $("#formMessage input").val();
        
        console.log(name);
        console.log(message);
        chatHub.server.send(name, message);

        return false;
    });

}