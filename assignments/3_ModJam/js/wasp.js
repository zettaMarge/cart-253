/**
 * Class for the wasps
 * Has a position, size, speed of horizontal movement, and possibility of moving in a wavy pattern
 */
class Wasp extends BugBase {
    /**
     * Constructor
     */
    constructor() {
        // Calls the base class constructor
        super(0, 200, 15, 1.5, 1.5, 3, 0)
    }

    /**
     * Handles the tongue overlapping the wasp
     */
    checkTongueOverlap() {
        // Vertices of the wasp triangle
        let x1;
        let y1;
        let x2;
        let y2;
        let x3;
        let y3;

        // Depending on where the wasp is heading, the triangle faces a different direction
        if (wasp.speed > 0) {
            x1 = wasp.x - wasp.size;
            y1 = wasp.y;

            x2 = wasp.x + wasp.size;
            y2 = wasp.y - wasp.size;

            x3 = wasp.x + wasp.size;
            y3 = wasp.y + wasp.size;
        }
        else {
            x1 = wasp.x + wasp.size;
            y1 = wasp.y;

            x2 = wasp.x - wasp.size;
            y2 = wasp.y - wasp.size;

            x3 = wasp.x - wasp.size;
            y3 = wasp.y + wasp.size;
        }

        // Area of the wasp triangle
        let triangleArea = getTriangleArea(
            x1, y1,
            x2, y2,
            x3, y3
        );

        // 3 Sub-triangle areas, using different combinations of 2 vertices 
        // of the wasp triangle and the potentially overlapping point as the third
        let A1 = getTriangleArea(
            frog.tongue.x, frog.tongue.y,
            x2, y2,
            x3, y3
        );

        let A2 = getTriangleArea(
            x1, y1,
            frog.tongue.x, frog.tongue.y,
            x3, y3
        );

        let A3 = getTriangleArea(
            x1, y1,
            x2, y2,
            frog.tongue.x, frog.tongue.y,
        );

        // If the tongue overlaps the triangle, then the difference between the sum of the
        // sub-areas and the total area should be close to 0.
        const eaten = abs(A1 + A2 + A3 - triangleArea) < 0.001

        if (eaten) {
            // Reset the wasp
            wasp.resetBug();
            // Stun the frog
            frog.tongue.state = CharacterStates.STUNNED;
            assets.stunnedSfx.play();
        }
    }

    /**
     * Draws the wasp as a yellow triangle
     */
    drawBug() {
        // Vertices of the wasp triangle
        let x1;
        let y1;
        let x2;
        let y2;
        let x3;
        let y3;

        // Depending on where the wasp is heading, we want the triangle to point in the other direction (for the stinger)
        if (this.speed > 0) {
            x1 = this.x - this.size;
            y1 = this.y;

            x2 = this.x + this.size;
            y2 = this.y - this.size;

            x3 = this.x + this.size;
            y3 = this.y + this.size;
        }
        else {
            x1 = this.x + this.size;
            y1 = this.y;

            x2 = this.x - this.size;
            y2 = this.y - this.size;

            x3 = this.x - this.size;
            y3 = this.y + this.size;
        }

        push();
        noStroke();
        fill("#ffd563");
        triangle(
            x1, y1,
            x2, y2,
            x3, y3
        );
        pop();
    }
}