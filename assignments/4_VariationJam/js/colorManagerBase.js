/**
 * "Interface" for the color manager
 * Does not have predefined H/S/B values, so the interface needs to be implemented to work
 */
class ColorManagerBase {
    /**
     * Changes a tile's hue, saturation, and brightness
     * @param {Number} iRow The tile's row index
     * @param {Number} jCol The tile's column index
     */
    changeTileColor(iRow, jCol) {
        const tile = maze.tiles[iRow][jCol];
        
        if (this.hBase === 0) {
            tile.h = (tile.h + this.hIncr) % 360;
        }
        else {
            tile.h = (this.hBase + this.hIncr) % 360;
        }

        if (this.sBase === 0) {
            tile.s = (tile.s + this.sIncr) % 255;
        }
        else {
            tile.s = (this.sBase + this.sIncr) % 255;
        }

        if (this.bBase === 0) {
            tile.b = (tile.b + this.bIncr) % 255;
        }
        else {
            tile.b = (this.bBase + this.bIncr) % 255;
        }
    }
}