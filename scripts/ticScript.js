const TILE_ROWS = 3;
const TILE_COLS = 3;
const TILE_W = canvas.width / TILE_COLS;
const TILE_H = canvas.height / TILE_ROWS;
var tileGrid = [];
var gameState = 0;

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

function drawTicBoard() {
  canvasContext.fillStyle = '#ecf0f1';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];
    if ((box.rowX + box.colY) % 2 == 0) {
      canvasContext.fillStyle = '#95a5a6';
      canvasContext.fillRect(box.posX, box.posY, TILE_W, TILE_H);
    }
    
    canvasContext.font = "10px Arial";
    canvasContext.fillStyle = 'black';
    canvasContext.fillText(i, box.posX + 10, box.posY + 10);
  }

  canvasContext.fillStyle = 'black';
  canvasContext.textAlign = "center";
  canvasContext.textBaseline = "middle";
  var fontSize = (TILE_W * 0.8).toString();
  canvasContext.font = fontSize + "px Short Stack";

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];

    canvasContext.fillStyle = 'black';
    if (box.state == 1) {
      canvasContext.fillText("X", box.posX + TILE_W / 2, box.posY + TILE_H / 2);
    } else if (box.state == 2) {
      canvasContext.fillText("O", box.posX + TILE_W / 2, box.posY + TILE_H / 2);
    }

    //Draw on mouse location
    if (i == tileOverIdx) {
      outlineTile(box.posX, box.posY, TILE_W, TILE_H);
      ghostMove();
    }
  }

  if (gameState > 0) {
    canvasContext.fillStyle = 'red';
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";    
    canvasContext.font = "50px Arial";
    canvasContext.fillText("Player " + gameState + " wins!", canvas.width / 2, canvas.height / 2);
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

    if (tileGrid[tileOverIdx].state === 0 && (gameState == 0)) {
      canvasContext.fillStyle = 'grey';
      canvasContext.fillText(showText, box.posX + TILE_W / 2, box.posY + TILE_H / 2);
    }

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

function ticMouseClicked(selectedIdx) {
  if (gameState == 0){
  
    if (tileGrid[tileOverIdx].state === 0) {
      tileGrid[selectedIdx].state = playerTurn;
      if (checkVictoryCondition())
        gameState = playerTurn;
      if (playerTurn == 1) {
        playerTurn = 2;
      } else {
        playerTurn = 1;
      }
    }

  }
}

function checkVictoryCondition(){  
  
  if ((tileGrid[0].state == playerTurn && tileGrid[1].state == playerTurn && tileGrid[2].state == playerTurn) ||
      (tileGrid[3].state == playerTurn && tileGrid[4].state == playerTurn && tileGrid[5].state == playerTurn) ||
      (tileGrid[6].state == playerTurn && tileGrid[7].state == playerTurn && tileGrid[8].state == playerTurn) ||
      (tileGrid[0].state == playerTurn && tileGrid[3].state == playerTurn && tileGrid[6].state == playerTurn) ||
      (tileGrid[1].state == playerTurn && tileGrid[4].state == playerTurn && tileGrid[7].state == playerTurn) ||
      (tileGrid[2].state == playerTurn && tileGrid[5].state == playerTurn && tileGrid[8].state == playerTurn) ||
      (tileGrid[0].state == playerTurn && tileGrid[4].state == playerTurn && tileGrid[8].state == playerTurn) ||
      (tileGrid[2].state == playerTurn && tileGrid[4].state == playerTurn && tileGrid[6].state == playerTurn))
  {
    return true;
  } else {
    return false;
  }

  return false;
}

