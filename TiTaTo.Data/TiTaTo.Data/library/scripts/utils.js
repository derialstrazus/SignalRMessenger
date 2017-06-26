function findTileCenter(posX, posY) {
    var centerX = posX + TILE_W / 2;
    var centerY = posY + TILE_H / 2;

    return { x: centerX, y: centerY }
}








function APIGet(path, options, successMethod, failureMethod) {
    $.get(path).then(
        function (data) {
            successMethod(data)
        },
        function (xhr, status, error) {
            failureMethod();
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
        });
}

function APIPost(path, options, successMethod, failureMethod) {
    var params = {
        url: path,
        data: options,
        dataType: "json",
        type: "POST"
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

function APIPut() {
    var params = {
        url: path,
        data: options,
        method: "PUT"
    }
    $.ajax(params).then(
        function (data) {
            successMethod(data)
        },
        function (xhr, status, error) {
            failureMethod();
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
        });
}

function APIDelete() {
    var params = {
        url: path,
        data: options,
        method: "DELETE"
    }
    $.ajax(params).then(
        function (data) {
            successMethod(data)
        },
        function (xhr, status, error) {
            failureMethod();
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
        });
}

