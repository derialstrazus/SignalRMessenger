function initializeLogin() {
    if (sessionStorage.getItem("ID") !== null && sessionStorage.getItem("ID") !== undefined) {
        window.location.href = "/game.html";
    }

    $("#submitUsername").click(function (e) {
        var username = $("#usernameInput").val();
        var passThis = {'': username}
        APIPost("api/authentication", passThis, loginSuccess, loginFailure);
    });
}

function loginSuccess(data) {
    if (data.ID !== null && data.ID !== undefined) {
        sessionStorage.setItem("ID", data.ID);
        sessionStorage.setItem("Name", data.Name);

        window.location.href = "/game.html";
    } else {
        alert("No GUID returned");
    }
    
}

function loginFailure(xhr, status, error) {    
    var message = "Login failed.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}