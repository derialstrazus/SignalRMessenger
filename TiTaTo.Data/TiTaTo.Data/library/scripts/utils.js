function findTileCenter(posX, posY) {
    var centerX = posX + TILE_W / 2;
    var centerY = posY + TILE_H / 2;

    return { x: centerX, y: centerY }
}

//========================== API CALLS ==================================

function APIGet(path, options, successMethod, failureMethod) {
    var headers = { "UserID": Cookie.Get("ID") };
    $.get({
        url: path,
        headers: headers,
        data: options
    }).then(
        function (data, status, xhr) {
            if (successMethod !== null && successMethod !== undefined)
                successMethod(data);
        },
        function (xhr, status, error) {            
            if (xhr.status == 401) {
                CleanUpAndRedirectToLogin();
            }
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIPost(path, options, successMethod, failureMethod) {    
    var headers = { "UserID": Cookie.Get("ID") };
    var params = {
        url: path,
        headers: headers,
        data: options,
        dataType: "json",
        method: "POST"
    }
    $.ajax(params).then(
        function (data) {
            if (successMethod !== null && successMethod !== undefined)
                successMethod(data);
        },
        function (xhr, status, error) {
            if (xhr.status == 401) {
                CleanUpAndRedirectToLogin();
            }
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIPut(path, options, successMethod, failureMethod) {
    var headers = { "UserID": Cookie.Get("ID") };
    var params = {
        url: path,
        headers: headers,
        data: options,
        dataType: "json",
        method: "PUT"
    }
    $.ajax(params).then(
        function (data) {
            if (successMethod !== null && successMethod !== undefined)
                successMethod(data);
        },
        function (xhr, status, error) {
            if (xhr.status == 401) {
                CleanUpAndRedirectToLogin();
            }
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIDelete(path, options, successMethod, failureMethod) {
    var headers = { "UserID": Cookie.Get("ID") };
    var params = {
        url: path,
        headers: headers,
        data: options,
        dataType: "json",
        method: "DELETE"
    }
    $.ajax(params).then(
        function (data) {
            if (successMethod !== null && successMethod !== undefined)
                successMethod(data);
        },
        function (xhr, status, error) {
            if (xhr.status == 401) {
                CleanUpAndRedirectToLogin();
            }
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function CleanUpAndRedirectToLogin() {
    Cookie.Remove("ID");
    Cookie.Remove("Name");
    //TODO: Add redirect URL to query string
    //TODO: login initialize needs to see redirect URL and send user to page after login
    alert("Your user does not exist on the database.  Please login as a new user.");
    window.location.href = "/login.html";
}

function GenericAPISuccess(data) {
    console.log(JSON.stringify(data, "", 2));
}

function GenericAPIFail(xhr, status, error) {
    var message = "API call failed.  Server says: " + xhr.responseJSON.ExceptionMessage;
    alert(message);
}


//========================== COOKIES ==================================
//TODO: Understand how this works and write own version.
var Cookie;
(function (Cookie) {
    function Set(key, value, expireIn) {
        expireIn = expireIn || 7;
        var d = new Date();
        d.setTime(d.getTime() + (expireIn * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = key + "=" + value + "; " + expires;
    }
    Cookie.Set = Set;
    function Get(key) {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    Cookie.Get = Get;
    function Remove(key) {
        Set(key, '');
        var check = Get(key);
        return (check === null || check === undefined || check === "");
    }
    Cookie.Remove = Remove;
    function RemoveAll() {
        var pathBits = location.pathname.split('/');
        var pathCurrent = ' path=';
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
        var cookies = document.cookie.split(";");
        for (var i = 0; i < pathBits.length; i++) {
            pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
            for (var x = 0; x < cookies.length; x++) {
                var cookie = cookies[x];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
            }
        }
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            Set(name, "", -1);
        }
    }
    Cookie.RemoveAll = RemoveAll;
})(Cookie = Cookie || (Cookie = {}));