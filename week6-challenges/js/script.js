/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * edit by Marjorie Dudemaine
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 2
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

const gravity = 0.1;

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawBlock(paddle);
    drawBlock(ball);
}

/**
 * Challenge 2: Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = constrain(mouseX, 0, width);
}

/**
 * Challenge 3: Moves the ball
 * Challenge 5: Gravity
 */
function moveBall(ball) {
    ball.velocity.y += gravity;
    ball.y = constrain(ball.y + ball.velocity.y, 0, height);

    if (ball.y < height) {
        // Move the ball left/right if it's in the air
        ball.x = constrain(ball.x + ball.velocity.x, 0, width);
    }
}

/**
 * Challenge 4: Handle the ball bounce
 */
function handleBounce(ball, paddle) {
    if (isRectPointOverlap(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y)) {
        // Bounce off the paddle
        ball.velocity.y = ball.velocity.y * -1;

        if (ball.x > paddle.x - paddle.width/2 && ball.x < paddle.x) {
            // If the ball touches the left side of the paddle, bounce left
            ball.velocity.x = -1.5;
        }
        else {
            // If the ball touches the right side of the paddle, bounce right
            ball.velocity.x = 1.5;
        }
    }
    else if (ball.y <= 0) {
        // Bounce off the ceiling
        ball.velocity.y = ball.velocity.y * -1;
    }

    if (ball.x <= 0 || ball.x >= width) {
        // Bounce off the walls
        ball.velocity.x = ball.velocity.x * -1;
    }
}

/**
 * Returns if a point overlaps a rectangle, assuming rectMode is set to CENTER
 * @param {Number} xR x coordinate of the rectangle
 * @param {Number} yR y coordinate of the rectangle
 * @param {Number} wR width of the rectangle
 * @param {Number} hR height of the rectangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isRectPointOverlap(xR, yR, wR, hR, xP, yP) {
    // These give us the bounds of the rectangle's width and height
    let xMin = xR - wR/2;
    let xMax = xR + wR/2;
    let yMin = yR - hR/2;
    let yMax = yR + hR/2;

    // Is the point's x coordinate within the bounds of the rectangle's width
    // and is the y coordinate within the bounds of the rectangle's height?
    return (xP >= xMin && xP <= xMax && yP >= yMin && yP <= yMax);
}

/**
 * Draws the paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the ball on the canvas
 */
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

/**
 * Challenge 1: function that can draw both elements
 */
function drawBlock(block) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(block.x, block.y, block.width, block.height);
    pop();
}
