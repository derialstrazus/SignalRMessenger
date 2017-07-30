var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");

function initializeChatRoom() {
    console.log("Start!");

    var chatHub = $.connection.chatHub;
    $.connection.hub.logging = true;
    $.connection.hub.start();

    //chatHub.server.join(playerID);

    $("#formMessage").submit(function (e) {
        var name = Cookie.Get("Name");
        if (name === null || name === undefined || name === "") {
            name = "John Doe";
        }

        var message = $("#formMessage input").val();

        console.log(name);
        console.log(message);

        chatHub.server.join(playerID)
            .fail(function (e) {
                SignalRFailure;
                alert("Something went wrong");
                window.location.href = "/login.html";
            });

        return false;
    });

    var SignalRFailure = function SignalRFailure(e) {
        if (e.source === "HubException") {
            console.log(e.message);
        }
    }    
}