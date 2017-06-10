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
        data: options
    }
    $.post(params).then(
        function (data) {
            successMethod(data)
        },
        function (xhr, status, error) {
            failureMethod();
            console.log("There was an error completing the request.  Status: " + xhr.statusText);
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

