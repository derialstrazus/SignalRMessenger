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

    // canvasContext.fillStyle = 'black';
    // canvasContext.font = "10px Arial";
    // canvasContext.fillText(i, box.posX + 10, box.posY + 20);

    //TODO: if box.state == 1, print X
    //TODO: if box.state == 2, print O

    //Draw on mouse location
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
    var showText;
    if (playerTurn == 1) {      
      showText = "X";
    } else {      
      showText = "O";
    }
        
    canvasContext.fillStyle = 'grey';
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    var fontSize = (TILE_W * 0.8).toString();
    canvasContext.font = fontSize + "px Short Stack";
    canvasContext.fillText(showText, box.posX + TILE_W / 2, box.posY + TILE_H / 2);
  }
}

function drawTicHUD() {
  canvasContext.fillStyle = 'black';
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  canvasContext.font = "10px Arial";
  var playerString = "";
  if (playerTurn == 1)
    playerString = "X";
  else
    playerString = "O";
  var message = "player turn: " + playerString;
  canvasContext.fillText(message, canvas.width - TILE_W / 2, canvas.height - 10);
}



function mouseHoverTile() {



}

