const ticBackground = {
  rows: 3,
  cols: 3,
  boxWidth: canvas.width / 3,
  boxHeight: canvas.height / 3,
  locationArr: []
}
for (let i = 1; i <= ticBackground.rows; i++) {
  for (let j = 1; j <= ticBackground.cols; j++) {
    ticBackground.locationArr.push({
      rowX: i,
      colY: j,
      letterY: String.fromCharCode(64 + j),
      posX: (i - 1) * ticBackground.boxWidth,
      posY: canvas.height - ((j) * ticBackground.boxHeight),
    });
  }
}

function drawTicBoard() {
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ticBackground.locationArr.length; i++) {
    var box = ticBackground.locationArr[i];
    if ((box.rowX + box.colY) % 2 == 0) {
      canvasContext.fillStyle = 'grey';
      canvasContext.fillRect(box.posX, box.posY, ticBackground.boxWidth, ticBackground.boxHeight);
    }
  }
}