function findTileCenter(posX, posY) {
	var centerX = posX + TILE_W / 2;
	var centerY= posY + TILE_H / 2;

	return {x: centerX, y: centerY}
}

