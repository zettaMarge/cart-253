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
    // The frog's tongue has a position, size, speed, state, and stun timer
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: FrogStates.IDLE,
        stunTimer: 3,
        initTimer: 3
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
const fly = new Fly();

// The dreaded wasp
const wasp = new Wasp();

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

// How many seconds the game has been running
let gameTime = 0;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(960, 800);
    rectMode(CENTER);
    preload();
    // Give the bugs their first random position
    fly.resetBug();
    wasp.resetBug();
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
    advanceGameTime();
    fly.moveBug();
    fly.drawBug();
    wasp.moveBug();
    wasp.drawBug();
    moveFrog();
    moveTongue();
    drawFrog();
    fly.checkTongueOverlap();
    wasp.checkTongueOverlap();
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
    if (frog.tongue.state === FrogStates.IDLE) {
        frog.tongue.y = frog.body.y;
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === FrogStates.OUTBOUND) {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = FrogStates.INBOUND;
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === FrogStates.INBOUND) {
        frog.tongue.y += frog.tongue.speed;
        // **EDIT The tongue stops once it gets back to the frog
        if (frog.tongue.y >= frog.body.y) {
            frog.tongue.state = FrogStates.IDLE;
        }
    }
    // If the frog is stunned, there's a timer before it returns to idle
    else if (frog.tongue.state === FrogStates.STUNNED) {
        if (frameCount % 60 == 0 && frog.tongue.stunTimer > 0) {
            --frog.tongue.stunTimer;
        }

        if (frog.tongue.stunTimer == 0) {
            frog.tongue.stunTimer = frog.tongue.initTimer;
            frog.tongue.state = FrogStates.IDLE;
        }

        // Return the tongue to the frog, but slightly slower
        if (frog.tongue.y < frog.body.y) {
            frog.tongue.y += frog.tongue.speed/3;
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
 * Event when a bouse button is pressed
 */
function mousePressed() {
    if (gameStateFunc === gameOngoing) {
        // Launch the tongue on click (if it's not launched yet and idle)
        if (frog.tongue.state === FrogStates.IDLE) {
            frog.tongue.state = FrogStates.OUTBOUND;
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
 * Increments the game time for every second that passes
 */
function advanceGameTime() {
    if (frameCount % 60 === 0) {
        ++gameTime;
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
 * Returns the area of a triangle
 * @param {Number} x1 x coordinate of the first vertex
 * @param {Number} y1 y coordinate of the first vertex
 * @param {Number} x2 x coordinate of the second vertex
 * @param {Number} y2 y coordinate of the second vertex
 * @param {Number} x3 x coordinate of the third vertex
 * @param {Number} y3 y coordinate of the third vertex
 * @returns 
 */
function getTriangleArea(x1, y1, x2, y2, x3, y3) {
    return abs((
        x1 * (y2 - y3)
        + x2 * (y3 - y1)
        + x3 * (y1 - y2)
    ) / 2.0);
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
    textSize(36);
    text(`You've managed to eat ${fliesEatenStr}\nand live a long life of ${gameTime} seconds\nbefore croaking it.`, width/2, 165);
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
    // Reset the timer
    gameTime = 0;

    // Reset the frog
    frog.stomach.emptySize = frog.stomach.initSize;
    frog.stomach.fliesEatenCount = 0;
    frog.tongue.state = FrogStates.IDLE

    // Reset the bugs
    fly.resetBug();
    wasp.resetBug();

    // Restart the game
    gameStateFunc = gameOngoing;
}