var mouseX;
var mouseY;
var selectedIdx = -1;
var tileOverId = -1;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var tileOverCol = Math.floor(mouseX / TILE_W);
	var tileOverRow = Math.floor(mouseY / TILE_H);

	return {
		x:mouseX,
		y:mouseY
	};
}

