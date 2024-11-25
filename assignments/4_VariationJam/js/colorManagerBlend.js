/**
 * Color manager for the "Blend" variation
 */
class ColorManagerBlend extends ColorManagerBase {
    hBase = 0;
    hIncr = 0;
    sBase = 200;
    sIncr = 0;
    bBase = 245;
    bIncr = 0;

    /**
     * Changes a tile's hue, saturation, and brightness
     * @param {Number} iRow The tile's row index
     * @param {Number} jCol The tile's column index
     * @param {Boolean} isPlayer1 If the entity that's moving is player 1
     */
    changeTileColor(iRow, jCol, isPlayer1) {
        const tile = maze.tiles[iRow][jCol];

        if (tile.type === MazeTileMap.EMPTY) {
            if (isPlayer1) {
                this.hBase = player1.colorFill.trail.h;
                tile.type = MazeTileMap.PLAYER_1_TRAIL;
            }
            else {
                this.hBase = player2.colorFill.trail.h;
                tile.type = MazeTileMap.PLAYER_2_TRAIL;
            }

            super.changeTileColor(iRow, jCol);
        }
        else {
            let hMix;

            if (abs(player1.colorFill.trail.h - player2.colorFill.trail.h) < 200) {
                hMix = (player1.colorFill.trail.h + player2.colorFill.trail.h)/2;
            }
            else {
                // The mix is red + blue = purple, and the formula doesn't work for this case
                hMix = 270;
            }

            if ((isPlayer1 && (tile.type === MazeTileMap.PLAYER_2_TRAIL || tile.type === MazeTileMap.PLAYER_2_SPAWN)) || 
                (!isPlayer1 && (tile.type === MazeTileMap.PLAYER_1_TRAIL || tile.type === MazeTileMap.PLAYER_1_SPAWN))) {
                this.hBase = hMix;

                if (tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                    tile.type = MazeTileMap.COMBINED_TRAIL;
                }
                
                super.changeTileColor(iRow, jCol);
            }
            // Don't need to change the color and type if a player goes over their own trail
        }
    }
}