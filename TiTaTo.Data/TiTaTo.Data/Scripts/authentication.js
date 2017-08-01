const redirectHere = "/chatroomSigR.html";
const announcementsArr = [
    "Across the lands, I am known as:",
    "They see me rollin', they screamin':",
    "When I'm in the club the hotties call me:",
    "...:",
    "Please mail the check to:"
];

function initializeLogin() {
    if (Cookie.Get("ID") !== null && Cookie.Get("ID") !== undefined && Cookie.Get("ID") !== "") {
        APIGet("api/authentication", null, isLogin, null);
    }

    var announcement = announcementsArr[Math.floor(Math.random() * announcementsArr.length)];
    $("#formLoginInput label").empty();
    $("#formLoginInput label").append(announcement);

    $("#formLoginInput").submit(function (e) {
        var username = $("#usernameInput").val();
        var passThis = {'': username}
        APIPost("api/authentication", passThis, loginSuccess, loginFailure);
        return false;
    });
}

function isLogin() {
    window.location.href = redirectHere;
}

function loginSuccess(data) {
    if (data.ID !== null && data.ID !== undefined) {        
        Cookie.Set("ID", data.ID);
        Cookie.Set("Name", data.Name);

        window.location.href = redirectHere;
    } else {
        alert("No GUID returned");
    }
}

function loginFailure(xhr, status, error) {
    var message = "Login failed.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}