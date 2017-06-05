const TILE_ROWS = 3;
const TILE_COLS = 3;
const TILE_W = canvas.width / TILE_COLS;
const TILE_H = canvas.height / TILE_ROWS;
var tileGrid = [];

var playerTurn = 1;

for (let i = 0; i < TILE_ROWS; i++) {
  for (let j = 0; j < TILE_COLS; j++) {
    tileGrid.push({
      rowX: i,
      colY: j,
      posX: j * TILE_W,
      posY: i * TILE_H,
      state: 0
    });
  }
}

tileGrid[2].state = 1
tileGrid[3].state = 1
tileGrid[6].state = 2
tileGrid[7].state = 1

function drawTicBoard() {
  canvasContext.fillStyle = '#ecf0f1';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];
    if ((box.rowX + box.colY) % 2 == 0) {
      canvasContext.fillStyle = '#95a5a6';
      canvasContext.fillRect(box.posX, box.posY, TILE_W, TILE_H);
    }
  }

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];
    canvasContext.fillStyle = 'black';
    canvasContext.font = "10px";
    canvasContext.fillText(i, box.posX + 10, box.posY + 20);



    if (i == tileOverId) {
      outlineTile(box.posX, box.posY, TILE_W, TILE_H);
      ghostMove();
    }
  }

  function outlineTile(topLeftX, topLeftY, boxWidth, boxHeight) {
    if (playerTurn == 1)
      playerColor = "green"
    else
      playerColor = "red"

    canvasContext.beginPath();
    canvasContext.strokeStyle = playerColor;
    canvasContext.lineWidth = "3";
    canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.stroke();
  }

  function ghostMove() {
    if (playerTurn == 1) {
      playerColor = "green"
    } else {
      playerColor = "red"
    }
    
    canvasContext.fillStyle = 'blue';
    canvasContext.font = "20px";
    canvasContext.fillText("hello", box.posX + 50, box.posY + 50);
  }
}

function drawTicHUD() {
  canvasContext.fillStyle = 'black';
  canvasContext.font = "10px";
  var message = "player turn: " + playerTurn;
  canvasContext.fillText(message, canvas.width - TILE_W + 50, canvas.height - 10);
}



function mouseHoverTile() {



}

