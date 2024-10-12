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
        maxSize: 110,
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
    foodValue: 5,
};

// The button to reinitialize the game
// Its position is based on the canvas' size, so it can't be initialized here
const retryBtn = {
    x: undefined,
    y: undefined,
    w: 200,
    h: 100,
    stroke: {
        weight: 7.5,
        r: 0,
        g: 0,
        b: 0,
        a: 255
    },
    fill: {
        r: 255,
        g: 255,
        b: 255,
        a: 255
    },
    txt: {
        size: 40,
        weight: 2.5
    }
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

// What function to call based on the game's state
let gameStateFunc = gameOngoing;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(960, 800);
    rectMode(CENTER);
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
    
    gameStateFunc();
}

/**
 * Game state function when the game is currently ongoing
 * The frog and fly can move, and the stomach's contents vary
 */
function gameOngoing() {
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();

    changeStomachSize(frog.stomach.emptyRate);
    drawStomach();
    checkStomachEmpty();
}

/**
 * Game state function when the game is over
 * Shows the dead frog, how many flies were eaten, and a button to retry
 */
function gameOver() {
    drawGameOverTxt();
    drawFrogBody(width/2, height/2);
    drawRetryBtn();
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
    // **EDIT If the tongue is idle, it stays aligned with the frog's y coordinate
    if (frog.tongue.state === frogStates.IDLE) {
        frog.tongue.y = frog.body.y;
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
        // **EDIT The tongue stops once it gets back to the frog
        if (frog.tongue.y >= frog.body.y) {
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

    drawFrogBody();
}

/**
 * Draws the frog's body at a certain position
 * By default, the position is the one store in the frog object
 * @param {Number} x x coordinate
 * @param {Number} y y coordinate
 */
function drawFrogBody(x = frog.body.x, y = frog.body.y) {
    push();
    fill("#00ff00");
    noStroke();
    ellipse(x, y, frog.body.size);
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
        // Fill up the stomach a bit & add a fly to the counter
        changeStomachSize(-fly.foodValue)
        ++frog.stomach.fliesEatenCount
    }
}

/**
 * Event when a bouse button is pressed
 */
function mousePressed() {
    if (gameStateFunc === gameOngoing) {
        // Launch the tongue on click (if it's not launched yet)
        if (frog.tongue.state === frogStates.IDLE) {
            frog.tongue.state = frogStates.OUTBOUND;
        }
    }
    else if (gameStateFunc === gameOver) {
        // Reset the game if clicking the RETRY button
        if (isRectPointOverlap(retryBtn.x, retryBtn.y, mouseX, mouseY, retryBtn.w, retryBtn.h)) {
            resetGame();
        }
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
    // It's easier to manage its height and position when using the CORNER mode
    rectMode(CORNER);
    push();
    noStroke();
    fill(0);
    rect(width - 130, height - 200, 80, frog.stomach.emptySize);
    pop();
    // Reset to CENTER mode for everything else
    rectMode(CENTER);

    // Stomach with transparent hole png
    image(images.stomach.src, width - 260, height - 273, images.stomach.w, images.stomach.h);
}

/**
 * Triggers game over state if the stomach is empty
 */
function checkStomachEmpty() {
    if (frog.stomach.emptySize === frog.stomach.maxSize) {
        gameStateFunc = gameOver;
    }
}

/**
 * Returns if a point overlaps a rectangle
 * @param {Number} xR x coordinate of the rectangle
 * @param {Number} yR y coordinate of the rectangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isRectPointOverlap(xR, yR, xP, yP, w, h) {
    // Assuming rectMode is set to CENTER, these give us the bounds of the rectangle's width and height
    // Could be refactored to account for the other modes, but not necessary for this project
    let xMin = xR - w/2;
    let xMax = xR + w/2;
    let yMin = yR - h/2;
    let yMax = yR + h/2;

    // Is the point's x coordinate within the bounds of the rectangle's width
    // and is the y coordinate within the bounds of the rectangle's height?
    return (xP >= xMin && xP <= xMax && yP >= yMin && yP <= yMax);
}

/**
 * Draws a big GAME OVER and how many flies were eaten
 */
function drawGameOverTxt() {
    push();
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(0);
    strokeWeight(3.5);
    textSize(72);
    text("GAME OVER", width/2, 50);
    pop();

    // Get the grammar right if only 1 fly was eaten
    let fliesEatenStr;
    if (frog.stomach.fliesEatenCount === 1) {
        fliesEatenStr = "1 fly";
    }
    else {
        fliesEatenStr = `${frog.stomach.fliesEatenCount} flies`;
    }

    push();
    textAlign(CENTER, CENTER);
    fill(0);
    stroke(0);
    strokeWeight(1.5);
    textSize(40);
    text(`You've managed to eat ${fliesEatenStr} before croaking it.`, width/2, 125);
    pop();
}

/**
 * Draws the retry button
 */
function drawRetryBtn() {
    retryBtn.x = width/2;
    retryBtn.y = height - 150;
    
    let isHover = isRectPointOverlap(retryBtn.x, retryBtn.y, mouseX, mouseY, retryBtn.w, retryBtn.h);
    // Change button opacity to indicate whether the mouse is currently hovering it or not
    if (isHover) {
        retryBtn.stroke.a = 255;
        retryBtn.fill.a = 255;
    }
    else {
        retryBtn.stroke.a = 175;
        retryBtn.fill.a = 175;
    }

    push();
    stroke(retryBtn.stroke.r, retryBtn.stroke.g, retryBtn.stroke.b, retryBtn.stroke.a);
    strokeWeight(retryBtn.stroke.weight);
    fill(retryBtn.fill.r, retryBtn.fill.g, retryBtn.fill.b, retryBtn.fill.a);
    rect(retryBtn.x, retryBtn.y, retryBtn.w, retryBtn.h);
    pop();

    push();
    textAlign(CENTER, CENTER);
    fill(retryBtn.stroke.r, retryBtn.stroke.g, retryBtn.stroke.b, retryBtn.stroke.a);
    stroke(retryBtn.stroke.r, retryBtn.stroke.g, retryBtn.stroke.b, retryBtn.stroke.a);
    strokeWeight(retryBtn.txt.weight);
    textSize(retryBtn.txt.size);
    text("RETRY", retryBtn.x, retryBtn.y);
    pop();
}

/**
 * Reinitializes the game to its default state
 */
function resetGame() {
    frog.stomach.emptySize = frog.stomach.initSize;
    frog.stomach.fliesEatenCount = 0;
    frog.tongue.state = frogStates.IDLE
    resetFly();
    gameStateFunc = gameOngoing;
}