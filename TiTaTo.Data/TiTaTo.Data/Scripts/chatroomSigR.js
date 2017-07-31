var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");

var chatHub = $.connection.chatHub;

function initialize() {
    console.log("Start!");

    $.connection.hub.start()
        .done(StartConnectionSuccess)
        .fail(SignalRFailure);


}

chatHub.client.initialize = function (initializeDTO) {
    var chatRooms = initializeDTO.chatRooms;
    var users = initializeDTO.users;

    console.log(chatRooms);
    console.log(users);
}

var StartConnectionSuccess = function StartConnectionSuccess() {
    chatHub.server.join(playerID).fail(JoinServerFailed);
}

var JoinServerFailed = function JoinServerFailed(e) {
    SignalRFailure(e);
    alert("Failed to login");
    window.location.href = "/login.html";
}











var SignalRFailure = function SignalRFailure(e) {
    if (e.source === "HubException") {
        console.log(e.message);
    }
}