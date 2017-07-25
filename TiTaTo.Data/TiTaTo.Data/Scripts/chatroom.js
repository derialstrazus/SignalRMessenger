const refreshIntervalInSeconds = 5;

var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");
var activeChatRoom;
var roomLastUpdated;

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
    $("#formMessageInput").submit(function (e) {
       sendMessage();
       return false;
    });    

    $('#messageInput').keydown(function (event) {
        if (event.keyCode == 13) {
           $("#formMessageInput").submit();
           return false;
        }
    });

    GetActiveUsers();
    GetUserChatRooms();

    setInterval(function () {
        if (activeChatRoom !== null && activeChatRoom !== undefined) {
            APIPut("api/chatroom/" + activeChatRoom + "/join", null, GetChatRoomSuccess, GetChatRoomFailure);
        }
    }, 1000 * refreshIntervalInSeconds);
    //TODO: Create a new controller to return only most recent.
}







function GetActiveUsers() {
    APIGet("api/chatroom/users", null, GetActiveUsersSuccess, GetActiveUsersFailure);
}

function GetActiveUsersSuccess(data) {
    var appendThis = "";
    for (let i = 0; i < data.length; i++) {
        var userData = data[i];
        appendThis += userData.Name + ", ";
    }
    appendThis = appendThis.substring(0, appendThis.length - 2);
    $("#divActiveUsers").empty();
    $("#divActiveUsers").append(appendThis);
}

function GetActiveUsersFailure(xhr, status, error) {
    var message = "Failed to get users.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}







function GetUserChatRooms() {
    APIGet("api/chatroom", null, GetUserChatRoomsSuccess, GetUserChatRoomsFailure);
}

function GetUserChatRoomsSuccess(data) {
    $("#divChatRooms").empty();
    for (let i = 0; i < data.length; i++) {
        var chatRoom = data[i];
        RenderChatRoomLink(chatRoom);
    }
}

function GetUserChatRoomsFailure(xhr, status, error) {
    var message = "Failed to get chat rooms.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}

function RenderChatRoomLink(chatRoom) {
    console.log(chatRoom.RoomName);

    var divChatRooms = $("#divChatRooms");
    var divChatRoom = $(`<div id=chatroomlink${chatRoom.ID}></div>`).appendTo(divChatRooms);
    var chatRoomLink = $("<a href='#'>" + chatRoom.RoomName + "</a> ").appendTo(divChatRoom);

    chatRoomLink.click(function (e) {
        EnterChatRoom(chatRoom.ID)
    });     
}

function EnterChatRoom(roomID) {
    roomLastUpdated = null;
    APIPut("api/chatroom/" + roomID + "/join", null, GetChatRoomSuccess, GetChatRoomFailure);
    //TODO: Separate join and enter.  Join if you are not a member.  Enter if you are a member.
    //Or, just enter, and let the controller prompt you to join if you are not a member.
}

function GetChatRoomSuccess(data) {
    console.log(data);    

    activeChatRoom = data.ID;
    if (roomLastUpdated != undefined
        && roomLastUpdated != null
        && roomLastUpdated === data.LastUpdated) {
        return;
    }

    roomLastUpdated = data.LastUpdated;
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