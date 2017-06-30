function initializeLogin() {

    //Cookie.RemoveAll();     //Need to have this here for now since all the users reset on each run.
    //TODO: On Utils.js, if returned user not found, treat it as not logged in, remove cookie, and redirect user to login page

    if (Cookie.Get("ID") !== null && Cookie.Get("ID") !== undefined && Cookie.Get("ID") !== "") {
        window.location.href = "/chatroom.html";
    }

    $("#submitUsername").click(function (e) {
        var username = $("#usernameInput").val();
        var passThis = {'': username}
        APIPost("api/authentication", passThis, loginSuccess, loginFailure);
    });
}

function loginSuccess(data) {
    if (data.ID !== null && data.ID !== undefined) {        
        Cookie.Set("ID", data.ID);
        Cookie.Set("Name", data.Name);

        window.location.href = "/chatroom.html";
    } else {
        alert("No GUID returned");
    }
    
}

function loginFailure(xhr, status, error) {
    var message = "Login failed.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}