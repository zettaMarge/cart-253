/**
 * Frog^3 Deluxe DLC
 * base: Pippin Barr
 * edit: Marjorie Dudemaine
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: frogStates.IDLE
    },
    // The frog's stomach; how empty it is and can get, how fast it empties, and how much the frog has eaten
    stomach: {
        emptySize: 50,
        initSize: 50,
        maxSize: 115,
        emptyRate: 0.05,
        fliesEatenCount: 0
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    foodValue: undefined,
};

// Various images used in the game
// Each has a p5 Image source object, and size
const images = {
    stomach: {
        src: undefined,
        w: 250,
        h: 250
    },
    stomachFill: {
        src: undefined,
        w: 250,
        h: 250
    },
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(960, 800);
    preload();
    // Give the fly its first random position
    resetFly();
}

/**
 * Preloads various assets
 */
function preload() {
    images.stomach.src = loadImage("img/stomach.png");
    images.stomachFill.src = loadImage("img/stomach-fill.png");
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();

    changeStomachSize(frog.stomach.emptyRate);
    drawStomach();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === frogStates.IDLE) {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === frogStates.OUTBOUND) {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = frogStates.INBOUND;
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === frogStates.INBOUND) {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = frogStates.IDLE;
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = frogStates.INBOUND;
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === frogStates.IDLE) {
        frog.tongue.state = frogStates.OUTBOUND;
    }
}

/**
 * Increase/Decrease stomach's empty size by some amount
 * Positive (+) value empties the stomach
 * Negative (-) value fills the stomach
 * @param {Number} sizeIncr amount to change size by
 */
function changeStomachSize(sizeIncr) {
    frog.stomach.emptySize = constrain(
        frog.stomach.emptySize + sizeIncr,
        0,
        frog.stomach.maxSize
    );
}

/**
 * Draws the frog's stomach in the bottom left corner of the canvas
 */
function drawStomach() {
    // Line connecting icon to frog?
    
    // Circle icon background
    push();
    strokeWeight(4);
    stroke(240)
    fill("#7ba6b8")
    ellipse(width - 152.5, height - 140, 298, 273);
    pop();

    // Filled insides png
    image(images.stomachFill.src, width - 260, height - 273, images.stomachFill.w, images.stomachFill.h);

    // Black rectangle for emptying stomach
    push();
    noStroke();
    fill(0);
    rect(width - 130, height - 200, 80, frog.stomach.emptySize);
    pop();

    // Stomach with transparent hole png
    image(images.stomach.src, width - 260, height - 273, images.stomach.w, images.stomach.h);
}