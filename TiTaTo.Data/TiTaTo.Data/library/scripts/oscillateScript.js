const speed = 3;

var ball = {
    posX: 0,
    posY: canvas.height - 5,
    velX: speed,
    velY: 0,
};

const oscillatorBox = {
    borderT: 0,
    borderL: 0,
    borderB: canvas.height,
    borderR: canvas.width,
};

function oscillate() {
    if (ball.posY > oscillatorBox.borderB) {
        ball.velY = -speed;
    } else if (ball.posY < oscillatorBox.borderT) {
        ball.velY = speed;
    } else if (ball.posX > oscillatorBox.borderR) {
        ball.velX = -speed;
    } else if (ball.posX < oscillatorBox.borderL) {
        ball.velX = speed;
    }

    ball.posY += ball.velY;
    ball.posX += ball.velX;

    canvasContext.fillStyle = '#3498db';
    canvasContext.fillRect(ball.posX, ball.posY, 5, 5);
}
