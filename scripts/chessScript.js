const TILE_ROWS = 8;
const TILE_COLS = 8;
const TILE_W = canvas.width / TILE_COLS;
const TILE_H = canvas.height / TILE_ROWS;
var tileGrid = [];

for (let i = 1; i <= TILE_ROWS; i++) {
  for (let j = 1; j <= TILE_COLS; j++) {
    tileGrid.push({
      rowX: i,
      colY: j,
      letterY: String.fromCharCode(64 + j),
      posX: (i - 1) * TILE_W,
      posY: canvas.height - ((j) * TILE_H),
    });
  }
}

function drawChessBoard() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < tileGrid.length; i++) {
    var box = tileGrid[i];
    if ((box.rowX + box.colY) % 2 == 0) {
      canvasContext.fillStyle = 'grey';
      canvasContext.fillRect(box.posX, box.posY, TILE_W, TILE_H);
    }
  }
}