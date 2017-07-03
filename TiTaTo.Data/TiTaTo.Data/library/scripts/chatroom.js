const refreshIntervalInSeconds = 5;

var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");
var activeChatRoom;
var activeRoomMessages;

function initializeChatRoom() {
    if (playerID == "") {
        window.location.href = "/login.html";
    }

    $("#currentPlayer").append(`Currently logged in as ${playerName} (${playerID.substring(0, 8)})`);

    $("#btnLogout").click(function (e) {
        Cookie.RemoveAll();
        window.location.href = "/login.html";
    });

    //prepare send Message
    var sendButton = $("#btnSendMessage");
    sendButton.unbind();
    sendButton.click(function (e) {
        sendMessage();
        return false;
    });

    $('#messageInput').keydown(function (event) {
        if (event.keyCode == 13) {
            sendMessage();
            return false;
        }
    });

    GetAllChatRooms();

    setInterval(function () {
        if (activeChatRoom !== null && activeChatRoom !== undefined) {
            APIPut("api/chatroom/" + activeChatRoom + "/join", null, GetChatRoomSuccess, GetChatRoomFailure);
        }
    }, 1000 * refreshIntervalInSeconds);
    //TODO: Create a new controller to return only most recent.
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
    });     //TODO: Separate join and enter.  Join if you are not a member.  Enter if you are a member.
    //Or, just enter, and let the controller prompt you to join if you are not a member.
}

function GetChatRoomSuccess(data) {
    console.log(data);    

    activeChatRoom = data.ID;
    if (activeRoomMessages != undefined && activeRoomMessages != null && activeRoomMessages.length == data.Messages.length) {
        return;
    }

    activeRoomMessages = data.Messages;
    $("#tablePastMessages").empty();
    $("#hiddenChatRoomID").val(data.ID);

    for (let i = 0; i < data.Messages.length; i++) {
        var message = data.Messages[i];
        var date = new Date(message.TimeStamp);
        var today = new Date();
        var printDate = "";

        if (date.toDateString() === today.toDateString()) {
            printDate += date.toLocaleTimeString();
        } else {
            printDate += date.toDateString();
        }
        $("#tablePastMessages").append(`<tr><td class="sendername">${message.SenderName}</td><td class="sentmessage">${message.Content}</td><td class="senderdate">${printDate}</td></tr>`);
    }

    var chatDiv = document.getElementById("divPastMessages");
    chatDiv.parentElement.scrollTop = chatDiv.scrollHeight;
    
    $(".chatinput").show();
    $("#messageInput").focus();
}

function GetChatRoomFailure(xhr, status, error) {
    var message = "Failed to get chat room.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}

function sendMessage() {
    var chatRoomID = $("#hiddenChatRoomID").val();
    var messageToSend = $("#messageInput").val();
    if (messageToSend === "") {
        return false;
    }

    var sendThis = {
        Content: messageToSend
    }
    APIPost("api/chatroom/" + chatRoomID + "/messages", sendThis, SendMessageSuccess, SendMessageFailure);
    $("#messageInput").val("");

    function SendMessageSuccess(data) {
        GetChatRoomSuccess(data);
    }

    function SendMessageFailure(xhr, status, error) {
        var message = "Failed to send message.  Server says: " + xhr.responseJSON.ExceptionMessage;
        alert(message);
    }
}