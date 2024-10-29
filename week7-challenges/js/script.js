/**
 * Boingo
 * Pippin Barr
 * edit by Marjorie Dudemaine
 *
 * A bunch of balls that bounce around on the canvas
 */


// Challenge 2: ball array
let balls = [];

/**
 * Create the canvas and the ball
 */
function setup() {
  // Create the canvas
  createCanvas(400, 400);
  // Create the ball
  ball = createBall();
}

/**
 * Creates a random ball
 */
function createBall(x, y) {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: x,
    y: y,
    size: 20,
    // Colour
    fill: "#000000",
    // Movement
    velocity: {
      x: random(-5, 5),
      y: random(-5, 5)
    }
  };
  return newBall;
}

/**
 * Moves and draws the ball
 * Challenge 3: for loop
 */
function draw() {
  background("#87ceeb");

  for (let ball of balls) {
    moveBall(ball);
    bounceBall(ball);
    drawBall(ball);
  }
}

/**
 * Challenge 4: add balls
 */
function mousePressed(evt) {
    if (evt.button == 0) {
        balls.push(createBall(mouseX, mouseY))
    }
}

/**
 * Moves the ball according to its velocity
 */
function moveBall(ball) {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(ball) {
  // Check if the ball has reached the left or right
  const bounceX = (ball.x > width || ball.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (ball.y > height || ball.y < 0);
  
  // Handle bouncing horizontally
  if (bounceX) {
    ball.velocity.x *= -1;
  }
  // Handle bouncing vertically
  if (bounceY) {
    ball.velocity.y *= -1;
  }
}

/**
 * Draw the ball on the canvas
 */
function drawBall(ball) {
  push();
  noStroke();
  fill(ball.fill);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}
