/**
 * Color manager for the "Colorblind" variation
 */
class ColorManagerColorblind extends ColorManagerBase {
    hBase = 0;
    hIncr = 0;
    sBase = 0;
    sIncr = 0;
    bBase = 0;
    bIncr = -31.875;

    /**
     * Changes a tile's hue, saturation, and brightness
     * @param {Number} iRow The tile's row index
     * @param {Number} jCol The tile's column index
     * @param {Boolean} isPlayer1 If the entity that's moving is player 1
     */
    changeTileColor(iRow, jCol, isPlayer1) {
        super.changeTileColor(iRow, jCol);
        const tile = maze.tiles[iRow][jCol];

        if (tile.b === 0) {
            if (tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                tile.type = MazeTileMap.NEW_WALL;
            }
        }
        else {
            if (isPlayer1 && tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                tile.type = MazeTileMap.PLAYER_1_TRAIL;
            }
            else if (tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                tile.type = MazeTileMap.PLAYER_2_TRAIL;
            }
        }
    }
}