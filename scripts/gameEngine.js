var framesPerSecond = 15;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');

function setup () {
  console.log("initializing...");

  canvas.addEventListener('mousemove', function(evt) {
	  mouseMoveEvent(evt);
	});

  canvas.addEventListener('mousedown', function (evt) {
    mouseClickedEvent(evt);
  });
}

function initializeChess() {
  setInterval(function () {
    drawChessBoard();
    oscillate();
  }, 1000/framesPerSecond);
}

function initializeTic() {
  setInterval(function () {
    drawBackground();
    drawTicBoard();    
    drawTicHUD();
    //oscillate();
    //TODO: Add checkVictoryCondition();
  }, 1000/framesPerSecond);
}

//------------------------------------------------------------

var mouseX;
var mouseY;
var selectedIdx = -1;
var tileOverIdx = -1;

function mouseMoveEvent(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var tileOverCol = Math.floor(mouseX / TILE_W);
	var tileOverRow = Math.floor(mouseY / TILE_H);
	tileOverIdx = tileCoordToIndex(tileOverCol, tileOverRow);

  mouseHoverTile();	
}

function tileCoordToIndex(tileCol, tileRow) {
	return (tileCol + TILE_COLS * tileRow);
}

function mouseClickedEvent(evt) {
  selectedIdx = tileOverIdx;
  ticMouseClicked(selectedIdx);  
}






//------------------------------------------------------------

function drawBackground() {
  canvasContext.fillStyle = '#e74c3c';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}