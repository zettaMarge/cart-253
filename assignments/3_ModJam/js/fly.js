/**
 * Class for the flies
 * Has a position, size, speed of horizontal movement, and possibility of moving in a wavy pattern
 */
class Fly extends BugBase {
    /**
     * Constructor
     */
    constructor() {
        // Calls the base class constructor
        super(0, 200, 10, 3, 3, 5, 5);

        // Randomize the fly
        this.resetBug();
    }

    /**
     * Handles the tongue overlapping the fly
     */
    checkTongueOverlap() {
        if (frog.tongue.state != CharacterStates.STUNNED) {
            // Get distance from tongue to fly
            const d = dist(frog.tongue.x, frog.tongue.y, this.x, this.y);
            // Check if it's an overlap
            const eaten = (d < frog.tongue.size/2 + this.size/2);
            if (eaten) {
                // Reset the fly
                this.resetBug();
                // Bring back the tongue
                frog.tongue.state = CharacterStates.INBOUND;
                // Fill up the stomach a bit & add a fly to the counter
                changeStomachSize(-this.foodValue);
                ++frog.stomach.fliesEatenCount;
                // Make the Wasp King appear more often
                waspKing.interval.currentMaxTimer = constrain(waspKing.interval.currentMaxTimer -= 0.05, waspKing.interval.minTimer, waspKing.interval.initTimer);
            }
        }
    }

    /**
     * Draws the fly as a black circle
     */
    drawBug() {
        push();
        noStroke();
        fill("#000000");
        ellipse(this.x, this.y, this.size);
        pop();
    }
}