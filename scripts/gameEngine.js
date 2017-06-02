var farmesPerSecond = 30;

var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');

function initialize () {  
  console.log("initializing...");

  canvas.addEventListener('mousemove', function(evt) {
	  var mousePos = calculateMousePos(evt);
    console.log(`X: ${mousePos.x}, Y: ${mousePos.y}`);
	});

  setInterval(function () {
    drawEverything();
    oscillate();
  }, 1000/framesPerSecond);
}