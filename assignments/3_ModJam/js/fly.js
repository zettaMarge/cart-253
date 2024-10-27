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
    }

    /**
     * Handles the tongue overlapping the fly
     */
    checkTongueOverlap() {
        if (frog.tongue.state != CharacterStates.STUNNED) {
            // Get distance from tongue to fly
            const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
            // Check if it's an overlap
            const eaten = (d < frog.tongue.size/2 + fly.size/2);
            if (eaten) {
                // Reset the fly
                fly.resetBug();
                // Bring back the tongue
                frog.tongue.state = CharacterStates.INBOUND;
                // Fill up the stomach a bit & add a fly to the counter
                changeStomachSize(-fly.foodValue);
                ++frog.stomach.fliesEatenCount;
                // Make the Wasp King appear more often
                waspKing.interval.currentTimer = constrain(waspKing.interval.currentTimer -= 0.5, waspKing.interval.minTimer, waspKing.interval.initTimer);
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