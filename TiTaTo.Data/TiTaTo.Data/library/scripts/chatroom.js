var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");

function initializeChatRoom() {
    if (playerID == "") {
        window.location.href = "/login.html";
    }

    $("#currentPlayer").append(`Currently logged in as ${playerName} (${playerID})`);

    $("#btnLogout").click(function (e) {
        Cookie.RemoveAll();
        window.location.href = "/login.html";
    });

    GetAllChatRooms();
}

function GetAllChatRooms() {
    APIGet("api/chatroom/all", null, GetAllChatRoomsSuccess, GetAllChatRoomsFailure);
}

function GetAllChatRoomsSuccess(data) {
    for (let i = 0; i < data.length; i++) {
        var chatRoom = data[i];
        RenderChatRoomLink(chatRoom);
    }
}

function GetAllChatRoomsFailure(xhr, status, error) {
    var message = "Failed to get chat rooms.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}

function RenderChatRoomLink(chatRoom) {
    var userString = "";
    for (let j = 0; j < chatRoom.Users.length; j++) {
        userString += chatRoom.Users[j].Name + ", ";
    }
    userString = userString.substring(0, userString.length - 2);

    console.log(userString);
    var divChatRooms = $("#divChatRooms");
    var chatRoomLink = $(`<a href="">${userString}</a></br>`).appendTo(divChatRooms);

    chatRoomLink.onclick(function (e) {
        APIGet("api/chatroom/" + chatRoom.ID, null, GetChatRoomSuccess, GetChatRoomFailure);
    });
}

function GetChatRoomSuccess() {
    //TODO: render messages
}

function GetChatRoomFailure() {

}
