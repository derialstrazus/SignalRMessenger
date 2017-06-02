const background = {
  rows: 8,
  cols: 8,
  boxWidth: canvas.width / 8,
  boxHeight: canvas.height / 8,
  locationArr: []
}
for (let i = 1; i <= background.rows; i++) {
  for (let j = 1; j <= background.cols; j++) {
    background.locationArr.push({
      rowX: i,
      colY: j,
      letterY: String.fromCharCode(64 + j),
      posX: (i - 1) * background.boxWidth,
      posY: canvas.height - ((j) * background.boxHeight),
    });
  }
}

function drawChessBoard() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < background.locationArr.length; i++) {
    var box = background.locationArr[i];
    if ((box.rowX + box.colY) % 2 == 0) {
      canvasContext.fillStyle = 'grey';
      canvasContext.fillRect(box.posX, box.posY, background.boxWidth, background.boxHeight);
    }
  }
}