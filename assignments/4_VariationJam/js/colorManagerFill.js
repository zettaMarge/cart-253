/**
 * Color manager for the "Fill" variation
 */
class ColorManagerFill extends ColorManagerBase {
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
        
        if (isPlayer1) {
            this.hBase = player1.colorFill.trail.h;

            if (tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                tile.type = MazeTileMap.PLAYER_1_TRAIL; 
            }

            this.sBase = player1.colorFill.trail.s;
            this.bBase = player1.colorFill.trail.b;
        }
        else {
            this.hBase = player2.colorFill.trail.h;

            if (tile.type !== MazeTileMap.PLAYER_1_SPAWN && tile.type !== MazeTileMap.PLAYER_2_SPAWN) {
                tile.type = MazeTileMap.PLAYER_2_TRAIL; 
            }

            this.sBase = player2.colorFill.trail.s;
            this.bBase = player2.colorFill.trail.b;
        }

        const min = ceil(random(-25, -15));
        const max = ceil(random(15, 25));
        this.sIncr = random([min, max]);
        this.bIncr = ceil(-10,9);

        super.changeTileColor(iRow, jCol);
    }
}