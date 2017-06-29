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
    console.log(chatRoom.RoomName);

    var divChatRooms = $("#divChatRooms");
    var chatRoomLink = $(`<a href="#">${chatRoom.RoomName}</a></br>`).appendTo(divChatRooms);

    chatRoomLink.click(function (e) {
        APIPut("api/chatroom/" + chatRoom.ID + "/join", null, GetChatRoomSuccess, GetChatRoomFailure);
    });
}

function GetChatRoomSuccess(data) {    
    console.log(data);
    //window["data"] = data;

    $("#tablePastMessages").empty();

    for (let i = 0; i < data.Messages.length; i++) {
        var message = data.Messages[i];
        console.log(message.Content);
        var date = new Date(message.TimeStamp);
        var today = new Date();
        var printDate = "";

        if (date.toDateString() === today.toDateString()) {
            printDate += date.toLocaleTimeString();
        } else {
            printDate += date.toDateString();
        }        
        $("#tablePastMessages").append(`<tr><td>${message.SenderName}</td><td>${message.Content}</td><td>${printDate}</td></tr>`);
    }

    //prepare send Message
    var sendButton = $("#btnSendMessage");
    sendButton.click(function (e) {
        var messageToSend = $("#messageInput").val();
        var sendThis = {
            Content: messageToSend
        }
        
        APIPost("api/chatroom/" + data.ID + "/messages", sendThis, sendMessageSuccess, sendMessageFailure);
    });
}

function sendMessageSuccess(data) {
    GetChatRoomSuccess(data);
}

function sendMessageFailure(xhr, status, error) {

}

function GetChatRoomFailure(xhr, status, error) {
    var message = "Failed to get chat room.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}
