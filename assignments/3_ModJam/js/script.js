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
    // The frog's head has a position and size
    head: {
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

// The button to initialize the game
let startBtn;

// The button for showing Frogfrogfrog's patch notes
let patchNotesBtn;

// The button to reinitialize the game
let retryBtn;

// The button to exit the game
let exitBtn;

// Various assets used in the game
// Images have a p5 Image source object and size
// Sounds are loaded by p5
const assets = {
    stomachImg: {
        src: undefined,
        w: 250,
        h: 250
    },
    stomachFillImg: {
        src: undefined,
        w: 250,
        h: 250
    },
    tongueSfx: undefined,
    stunnedSfx: undefined
}

// What function to call based on the game's state
let gameStateFunc = gameTitleScreen;

// How many seconds the game has been running
let gameTime = 0;

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(960, 800);
    rectMode(CENTER);
    preload();
}

/**
 * Preloads various assets
 */
function preload() {
    assets.stomachImg.src = loadImage("img/stomach.png");
    assets.stomachFillImg.src = loadImage("img/stomach-fill.png");

    assets.tongueSfx = loadSound("sfx/tongue.wav");
    assets.stunnedSfx = loadSound("sfx/stunned.wav");

    startBtn = new Button(width/2, height - 150, 200, 100, 40, "START");
    patchNotesBtn = new Button(width - 50, 50, 50, 50, 40, "ⓘ");
    retryBtn = new Button(width/2, height - 150, 200, 100, 40, "RETRY");
    exitBtn = new Button(width - 50, 50, 50, 50, 40, "X");
}

function draw() {
    background("#87ceeb");
    gameStateFunc();
}

/**
 * Game state function when the game hasn't started yet
 * Shows the instructions and the button to start the game
 */
function gameTitleScreen() {
    // TODO add logo
    startBtn.display();
    patchNotesBtn.display();
}

/**
 * Game state function when the game is currently ongoing
 * The frog and fly can move, and the stomach's contents vary
 */
function gameOngoing() {
    frog.head.y = 520;
    exitBtn.display();

    advanceGameTime();
    fly.moveBug();
    fly.drawBug();
    wasp.moveBug();
    wasp.drawBug();
    moveFrog();
    moveTongue();
    drawLilypad();
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
    frog.head.x = width/2;
    frog.head.y = height/2;

    frog.tongue.x = frog.head.x;
    frog.tongue.y = frog.head.y - 92.5;

    drawGameOverTxt();
    drawFrog();
    retryBtn.display();
    exitBtn.display();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.head.x = constrain(mouseX, 120, width - 120);
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.head.x;
    // **EDIT If the tongue is idle, it stays aligned with the frog's y coordinate
    if (frog.tongue.state === FrogStates.IDLE) {
        frog.tongue.y = frog.head.y;
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
        if (frog.tongue.y >= frog.head.y) {
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
        if (frog.tongue.y < frog.head.y) {
            frog.tongue.y += frog.tongue.speed/3;
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog
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
    strokeWeight(frog.tongue.size/2);
    line(frog.tongue.x, frog.tongue.y, frog.head.x, frog.head.y);
    pop();
    
    drawFrogBody();
    drawFrogHead();
}

/**
 * Draws the frog's body, based on the position of the head
 */
function drawFrogBody() {
    // The toes
    push();
    fill("#629645");
    stroke("#4d822f");
    // Front left leg
    ellipse(frog.head.x - 80, frog.head.y, 15);
    ellipse(frog.head.x - 97.5, frog.head.y, 15);
    ellipse(frog.head.x - 107.5, frog.head.y + 12.5, 15);

    // Back left leg
    ellipse(frog.head.x - 97.5, frog.head.y + 85, 15);
    ellipse(frog.head.x - 92.5, frog.head.y + 99, 15);
    ellipse(frog.head.x - 80, frog.head.y + 107.5, 15);

    // Front right leg
    ellipse(frog.head.x + 80, frog.head.y, 15);
    ellipse(frog.head.x + 97.5, frog.head.y, 15);
    ellipse(frog.head.x + 107.5, frog.head.y + 12.5, 15);

    // Back right leg
    ellipse(frog.head.x + 97.5, frog.head.y + 85, 15);
    ellipse(frog.head.x + 92.5, frog.head.y + 99, 15);
    ellipse(frog.head.x + 80, frog.head.y + 107.5, 15);
    pop();

    // The legs
    push();
    fill("#78b854");
    stroke("#4d822f");
    // The left legs
    arc(frog.head.x - 85, frog.head.y + 25, 50, 50, HALF_PI + PI/9, 0);
    arc(frog.head.x - 75, frog.head.y + 85, 45, 45, HALF_PI - PI/9, PI + QUARTER_PI);

    // The right legs
    arc(frog.head.x + 85, frog.head.y + 25, 50, 50, PI + QUARTER_PI, HALF_PI - PI/9);
    arc(frog.head.x + 75, frog.head.y + 85, 45, 45, 0 - QUARTER_PI, HALF_PI + PI/9);
    pop();

    // The body
    push();
    fill("#78b854");
    stroke("#4d822f");
    ellipse(frog.head.x, frog.head.y + frog.head.size/3, frog.head.size * 1.25, frog.head.size * 1.1);
    arc(frog.head.x, frog.head.y + frog.head.size/1.25, 100, 45, 0, PI);
    pop();

    push();
    fill("#78b854");
    noStroke();
    ellipse(frog.head.x - 80, frog.head.y + 22.5, 40);
    ellipse(frog.head.x - 75, frog.head.y + 85, 35)
    ellipse(frog.head.x + 80, frog.head.y + 22.5, 40);
    ellipse(frog.head.x + 75, frog.head.y + 85, 35);
    pop();
}

/**
 * Draws the frog's head
 */
function drawFrogHead() {
    // The mouth
    push();
    fill("#4d822f");
    noStroke();
    ellipse(frog.head.x, frog.head.y - frog.head.size/2 + 5, frog.head.size/2 + 12.5, 20);
    pop();
    
    // The head
    push();
    fill("#78b854");
    stroke("#4d822f");
    strokeWeight(1.5);
    ellipse(frog.head.x, frog.head.y, frog.head.size);
    pop();

    push();
    fill("#78b854");
    noStroke();
    arc(frog.head.x, frog.head.y + 20, frog.head.size, frog.head.size, 0, PI);
    pop();

    // The nostrils
    push();
    fill("#4d822f");
    noStroke();
    ellipse(frog.head.x - 10, frog.head.y - 52.5, 10);
    ellipse(frog.head.x + 10, frog.head.y - 52.5, 10);
    pop();

    drawFrogEyes();
}

/**
 * Draws the frog's eyes based on the frog's state
 */
function drawFrogEyes() {
    // The eyelids
    push();
    fill("#4d822f");
    noStroke();
    ellipse(frog.head.x - 55, frog.head.y - 15, 50);
    ellipse(frog.head.x + 55, frog.head.y - 15, 50);
    pop();

    // The sclera
    push();
    fill(255);
    noStroke();
    arc(frog.head.x - 55, frog.head.y - 21, 47.5, 25, 0, PI);
    arc(frog.head.x + 55, frog.head.y - 21, 47.5, 25, 0, PI);
    pop();

    // The iris
    push();
    fill("#dbb753");
    noStroke();
    arc(frog.head.x - 55, frog.head.y - 20, 47.5, 40, PI, 0);
    arc(frog.head.x - 55, frog.head.y - 20, 47.5, 15, 0, PI);

    arc(frog.head.x + 55, frog.head.y - 20, 47.5, 40, PI, 0);
    arc(frog.head.x + 55, frog.head.y - 20, 47.5, 15, 0, PI);
    pop();

    // The pupils
    push();
    if (frog.tongue.state === FrogStates.STUNNED && frog.stomach.emptySize < frog.stomach.maxSize) {
        // The frog is dizzy
        fill(255);
        stroke(0);
        strokeWeight(1.5);
        // The left eye
        ellipse(frog.head.x - 55, frog.head.y - 32.5, 30, 7.5);
        ellipse(frog.head.x - 55, frog.head.y - 32.5, 15, 2.5);

        // The right eye
        ellipse(frog.head.x + 55, frog.head.y - 32.5, 30, 7.5);
        ellipse(frog.head.x + 55, frog.head.y - 32.5, 15, 2.5);
    }
    else if (frog.stomach.emptySize >= frog.stomach.maxSize) {
        // The frog is dead :(
        stroke(0);
        strokeWeight(4);
        // The left eye
        line(
            frog.head.x - 60, frog.head.y - 35,
            frog.head.x - 50, frog.head.y - 30
        );
        line(
            frog.head.x - 50, frog.head.y - 30,
            frog.head.x - 60, frog.head.y - 25
        );

        // The right eye
        line(
            frog.head.x + 60, frog.head.y - 35,
            frog.head.x + 50, frog.head.y - 30
        );
        line(
            frog.head.x + 50, frog.head.y - 30,
            frog.head.x + 60, frog.head.y - 25
        );
    }
    else {
        // The frog is fine
        fill(0);
        stroke(255);
        ellipse(frog.head.x - 55, frog.head.y - 32.5, 30, 7.5);
        ellipse(frog.head.x + 55, frog.head.y - 32.5, 30, 7.5);
    }
    pop();
}

/**
 * Draws a lilypad under the frog
 */
function drawLilypad() {
    push();
    fill("#81a345");
    noStroke();
    ellipse(frog.head.x, frog.head.y + 50, frog.head.size * 2);
    pop();

    push();
    fill("#87ceeb");
    noStroke();
    triangle(
        frog.head.x - 25, frog.head.y + 50,
        frog.head.x - frog.head.size, frog.head.y + 10,
        frog.head.x - frog.head.size, frog.head.y + 90
    );
    pop();
}

/**
 * Callback event when a bouse button is pressed
 * @param {MouseEvent} evt 
 */
function mousePressed(evt) {
    // Left click
    if (evt.button == 0) {
        if (gameStateFunc === gameOngoing) {
            if (isRectPointOverlap(exitBtn.x, exitBtn.y, exitBtn.w, exitBtn.h, mouseX, mouseY)) {
                // Return to the title screen
                gameStateFunc = gameTitleScreen;
            }
            else if (frog.tongue.state === FrogStates.IDLE) {
                // Launch the tongue on click (if it's not launched yet and idle)
                frog.tongue.state = FrogStates.OUTBOUND;
                assets.tongueSfx.play();
            }
        }
        else if (gameStateFunc === gameTitleScreen) {
            if (isRectPointOverlap(startBtn.x, startBtn.y, startBtn.w, startBtn.h, mouseX, mouseY)) {
                // Start the game if clicking the menu button
                resetGame();
            }
            else if (isRectPointOverlap(patchNotesBtn.x, patchNotesBtn.y, patchNotesBtn.w, patchNotesBtn.h, mouseX, mouseY)) {
                // Open the patch notes in another window
                window.open("./patchNotes.md");
            }
        }
        else if (gameStateFunc === gameOver) {
            if (isRectPointOverlap(retryBtn.x, retryBtn.y, retryBtn.w, retryBtn.h, mouseX, mouseY)) {
                // Reset the game if clicking the menu button
                resetGame();
            }
            else if (isRectPointOverlap(exitBtn.x, exitBtn.y, exitBtn.w, exitBtn.h, mouseX, mouseY)) {
                // Return to the title screen
                gameStateFunc = gameTitleScreen;
            }
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
    // Line connecting the icon to the frog
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(5);
    ellipse(frog.head.x, frog.head.y + frog.head.size/2.5, 7.5);
    line(width - 152.5, height - 140, frog.head.x, frog.head.y + frog.head.size/2.5);
    pop();
    
    // Circle icon background
    push();
    strokeWeight(4);
    stroke(240)
    fill("#7ba6b8")
    ellipse(width - 152.5, height - 140, 298, 273);
    pop();

    // Filled insides png
    image(assets.stomachFillImg.src, width - 260, height - 273, assets.stomachFillImg.w, assets.stomachFillImg.h);

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
    image(assets.stomachImg.src, width - 260, height - 273, assets.stomachImg.w, assets.stomachImg.h);
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
 * @param {Number} wR width of the rectangle
 * @param {Number} hR height of the rectangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isRectPointOverlap(xR, yR, wR, hR, xP, yP) {
    // Assuming rectMode is set to CENTER, these give us the bounds of the rectangle's width and height
    // Could be refactored to account for the other modes, but not necessary for this project
    let xMin = xR - wR/2;
    let xMax = xR + wR/2;
    let yMin = yR - hR/2;
    let yMax = yR + hR/2;

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
    fill("#4d822f");
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
    fill("#4d822f");
    stroke(0);
    strokeWeight(2.5);
    textSize(36);
    text(`You've managed to eat ${fliesEatenStr}\nand live a long life of ${gameTime} seconds\nbefore croaking it.`, width/2, 165);
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