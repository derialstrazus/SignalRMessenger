var ball = {
  posX: canvas.width - 30,
  posY: canvas.height - 20,
  velX: 0,
  velY: 1,
};

const oscillatorBox = {
  borderT: canvas.height - 40,
  borderL: canvas.width - 40,
  borderB: canvas.height - 20,
  borderR: canvas.width - 20,
};

function oscillate() {
  if (ball.posY > oscillatorBox.borderB) {
    ball.velY = -1;
  } else if (ball.posY < oscillatorBox.borderT) {
    ball.velY = 1;
  }

  ball.posY += ball.velY;

  canvasContext.fillStyle = 'red';
  canvasContext.fillRect(ball.posX, ball.posY, 5, 5);
}
