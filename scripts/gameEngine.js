var framesPerSecond = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');

function setup () {
  console.log("initializing...");

  canvas.addEventListener('mousemove', function(evt) {
	  calculateMousePos(evt);
    console.log(`X: ${mouseX}, Y: ${mouseY}`);
	});
}

function initializeChess() {
  setInterval(function () {
    drawChessBoard();
  }, 1000/framesPerSecond);
}

function initializeTic() {
  setInterval(function () {
    drawBackground();
    drawTicBoard();
    oscillate();
  }, 1000/framesPerSecond);
}






function drawBackground() {
  canvasContext.fillStyle = '#e74c3c';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}