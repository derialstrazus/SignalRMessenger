var playerID = Cookie.Get("ID");
var playerName = Cookie.Get("Name");
var today = new Date();

var chatHub = $.connection.chatHub;

function initialize() {
    console.log("Start!");

    $("#currentPlayer").append(`Logged in as ${playerName} (${playerID.substring(0, 8)})`);

    $.connection.hub.start()
        .done(StartConnectionSuccess)
        .fail(SignalRFailure);

    //prepare send Message
    $("#formMessageInput").submit(function (e) {
        sendMessage();
        $("#messageInput").val("");
        return false;
    });

    $('#messageInput').keydown(function (event) {
        if (event.keyCode == 13) {
            $("#formMessageInput").submit();
            return false;
        }
    });
}

chatHub.client.initialize = function (initializeDTO) {
    RenderUsers(initializeDTO.users);
    RenderChatRooms(initializeDTO.chatRooms);
}

var StartConnectionSuccess = function StartConnectionSuccess() {
    chatHub.server.joinServer(playerID).fail(JoinServerFailed);
}

var JoinServerFailed = function JoinServerFailed(e) {
    SignalRFailure(e);
    alert("Failed to login");
    window.location.href = "/login.html";
}




var RenderUsers = function RenderUsers(data) {
    $("#divActiveUsers").empty();
    var appendThis = "";
    for (let i = 0; i < data.length; i++) {
        var userData = data[i];
        //appendThis += userData.Name + ", ";
        RenderUserLink(userData);
    }
    //appendThis = appendThis.substring(0, appendThis.length - 2);    
    //$("#divActiveUsers").append(appendThis);
}

var RenderUserLink = function RenderUserLink(user) {
    var divActiveUsers = $("#divActiveUsers");

    var divUser = $(`<div id=userlink${user.ID}></div>`).appendTo(divActiveUsers);
    var userLink = $(`<a href="#">${user.Name}</a>`).appendTo(divUser);

    userLink.click(function (e) {
        chatHub.server.inviteToChat(user.ID)
            .fail(SignalRFailure);
    });
}




var RenderChatRooms = function RenderChatRooms(data) {
    $("#divChatRooms").empty();
    for (let i = 0; i < data.length; i++) {
        var chatRoom = data[i];
        RenderChatRoomLink(chatRoom);        
    }
}

function RenderChatRoomLink(chatRoom) {
    var divChatRooms = $("#divChatRooms");

    var divChatRoom = $(`<div id=chatroomlink${chatRoom.ID}></div>`).appendTo(divChatRooms);
    if (!chatRoom.HasReadLatest) {
        divChatRoom.addClass("NewMessage");
    }
    var chatRoomLink = $("<a href='#'>" + chatRoom.RoomName + "</a>").appendTo(divChatRoom);

    chatRoomLink.click(function (e) {
        EnterChatRoom(chatRoom.ID);
    });
}

function findMeTheArrayIndex(sourceArray, target) {
    for (var i = 0; i < messages.length; i++) {
        if (sourceArray[i].ID === target)
            return i;
    }
}

function EstablishParentChildRelationship() {

    //each child knows it has a parent, but the parent doesn't know it has a child.
    //this function inform each parent which child belongs to them.
    messages.forEach(possibleChild => {
        if (possibleChild.ParentID > 0) {
            const parentIndex = findMeTheArrayIndex(messages, possibleChild.ParentID);
            if (parentIndex == undefined) {
                possibleChild.ParentID = 0;
            } //if parent not found on person, treat this message as a parent instead
            else if (messages[parentIndex].childid == null) {
                messages[parentIndex].childid = [possibleChild.ID];
            } else {
                messages[parentIndex].childid.push(possibleChild.ID);
            } //for each message that has a parent, tell the parent that it has children
        }
    });   //TODO DK: Consider informing a parent it has a/another child when the child was first created in Aptify, so that we don't have to do the informing every time.

}

function EnterChatRoom(roomID) {
    chatHub.server.enterRoom(roomID)
        .fail(SignalRFailure);
}

chatHub.client.roomEntered = function RoomEntered(data) {
    enterTheRoom(data);
}

chatHub.client.roomExists = function RoomExists(data) {
    alert("You are already in a conversation with this person");
    enterTheRoom(data);
}

var enterTheRoom = function enterTheRoom(data) {
    $("#chatroomlink" + data.ID).removeClass("NewMessage");

    console.log("Entered " + data.RoomName);
    $("#currentRoom").empty().append(`- Talking in ${data.RoomName}`);
    //TODO: Check if this room exists on room list.  If not, add it.

    $("#tablePastMessages").empty();
    $("#hiddenChatRoomID").val(data.ID);

    for (let i = 0; i < data.Messages.length; i++) {
        var message = data.Messages[i];
        var date = new Date(message.TimeStamp);
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


function sendMessage() {
    var chatRoomID = $("#hiddenChatRoomID").val();
    var messageToSend = $("#messageInput").val();
    if (messageToSend === "") {
        return false;
    }

    chatHub.server.sendMessage(messageToSend, chatRoomID);
}

chatHub.client.currentRoomNewMessage = function CurrentRoomNewMessage(message) {    
    var date = new Date(message.TimeStamp);
    var printDate = "";
    if (date.toDateString() === today.toDateString()) {
        printDate += date.toLocaleTimeString();
    } else {
        printDate += date.toDateString();
    }
    $("#tablePastMessages").append(`<tr><td class="sendername">${message.SenderName}</td><td class="sentmessage">${message.Content}</td><td class="senderdate">${printDate}</td></tr>`);    
};

chatHub.client.otherRoomNewMessage = function OtherRoomNewMessage(roomID) {    
    $("#chatroomlink" + roomID).addClass("NewMessage");
}

chatHub.client.invitationReceived = function InvitationReceived(invitingUser, destinationChatRoomID) {
    var invitationMessage = invitingUser + " wants to chat with you.";
    var r = confirm(invitationMessage);
    if (r === true) {
        chatHub.server.enterRoom(destinationChatRoomID).fail(SignalRFailure);
    } else {
        return;
    }
}

chatHub.client.someoneJoined = function SomeoneJoined(user) {
    RenderUserLink(user);
}












var SignalRFailure = function SignalRFailure(e) {
    if (e.source === "HubException") {
        console.log(e.message);
    }
}