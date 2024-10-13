/**
 * Abstract class for the bugs
 */
class BugBase {
    /**
     * Constructor
     * @param {*} x center x coordinate
     * @param {*} y center y coordinate
     * @param {*} size size of the bug
     * @param {*} speed how fast the bug moves
     * @param {*} minSpeed the minimum speed the bug can move at
     * @param {*} maxSpeed the maximum speed the bug can move at
     * @param {*} foodValue how nutritious the bug is
     */
    constructor(x, y, size, speed, minSpeed, maxSpeed, foodValue) {
        this.x = x;
        this.y = y; // Will be random
        this.size = size;
        this.speed = speed; // Will be adjusted depending on direction (+/-)
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.foodValue = foodValue;
    }

    /**
     * Object property for everything related to the wavy flight pattern
     * If enabled, will use these to move the bug on the y axis
     */
    wavePattern = {
        enabled: false,
        angle: 0,
        angleMod: 0.075,
        heightMod: 5
    };

    /**
     * Moves the bug according to its speed
     * Resets the bug if it gets all the way to the edge of the canvas
     */
    moveBug() {
        // Move the bug horizontally
        this.x += this.speed;

        // Move the bug vertically
        if (this.wavePattern.enabled) { 
            this.y += cos(this.wavePattern.angle) * this.wavePattern.heightMod
            this.wavePattern.angle -= this.wavePattern.angleMod;
        }

        // Handle the bug going off the canvas
        if ((this.speed > 0 && this.x > width) || (this.speed < 0 && this.x < 0)) {
            this.resetBug();
        }
    }

    /**
     * Handles the tongue overlapping the bug
     */
    checkTongueOverlap() {
        throw new Error("Method 'checkTongueOverlap()' must be implemented.");
    }

    /**
     * Resets the bug either to the left or right with a random y,
     * speed, and if it's flying in a wave pattern or not
     */
    resetBug() {
        this.wavePattern.enabled = random([true, false]);
        this.x = random([0, width]);

        if (this.wavePattern.enabled) {
            // We don't want the bug to end up offscreen or too close to the frog while moving up and down
            this.wavePattern.angle = 0;
            this.y = random(125, 200);
        }
        else {
            this.y = random(10, 300);
        }
        
        if (this.x === width) {
            // Coming in from the right, will move left
            this.speed = -1 * random(this.minSpeed, this.maxSpeed);
        }
        else {
            // Coming in from the left, will move right
            this.speed = random(this.minSpeed, this.maxSpeed);
        }
    }

    /**
     * Draws the bug
     */
    drawBug() {
        throw new Error("Method 'drawBug()' must be implemented.");
    }
}