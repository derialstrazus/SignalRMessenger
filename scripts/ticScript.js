const TILE_ROWS = 3;
const TILE_COLS = 3;
const TILE_W = canvas.width / TILE_COLS;
const TILE_H = canvas.height / TILE_ROWS;
var tileGrid = [];

for (let i = 0; i < TILE_ROWS; i++) {
  for (let j = 0; j < TILE_COLS; j++) {
    tileGrid.push({
      rowX: i,
      colY: j,
      posX: j * TILE_W,
      posY: i * TILE_H
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
  }

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];    
    canvasContext.fillStyle = 'black';
    canvasContext.font = "10px";
    canvasContext.fillText(i, box.posX + 10, box.posY + 20);
  }
}

