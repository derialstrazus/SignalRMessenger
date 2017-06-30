function findTileCenter(posX, posY) {
    var centerX = posX + TILE_W / 2;
    var centerY = posY + TILE_H / 2;

    return { x: centerX, y: centerY }
}

//========================== API CALLS ==================================
//TODO: If 401 returned, redirect user to login page.

function APIGet(path, options, successMethod, failureMethod) {
    var userID = Cookie.Get("ID");
    var headers = { "UserID": userID };
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
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIPost(path, options, successMethod, failureMethod) {
    var userID = Cookie.Get("ID");
    var headers = { "UserID": userID };
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
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIPut(path, options, successMethod, failureMethod) {
    var userID = Cookie.Get("ID");
    var headers = { "UserID": userID };
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
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}

function APIDelete(path, options, successMethod, failureMethod) {
    var userID = Cookie.Get("ID");
    var headers = { "UserID": userID };
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
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
            console.log(xhr.responseJSON.ExceptionMessage);
            if (failureMethod !== null && failureMethod !== undefined) {
                failureMethod(xhr, status, error);
            }
        });
}


//========================== API CALLS ==================================
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
        return AHIMA.Helpers.IsNullOrEmpty(Get(key));
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