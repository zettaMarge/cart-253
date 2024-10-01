/**
 * The Only Move Is Not To Play
 * Pippin Barr
 * edit by Marjorie Dudemaine
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);

  //Challenge 3
  window.addEventListener("online", gameOverHandler);
  window.addEventListener("offline", gameOverHandler);

  //Challenge 4
  document.addEventListener("visibilitychange", gameOverHandler);

  //Challenge 5
  document.addEventListener("mousedown", gameOverHandler);
  document.addEventListener("mouseup", gameOverHandler);
  document.addEventListener("mousemove", gameOverHandler);
  document.addEventListener("wheel", gameOverHandler);
  document.addEventListener("keydown", gameOverHandler);
  document.addEventListener("keyup", gameOverHandler);
}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#87ceeb");
  
  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

/**
 * Challenge 1: lose using keyboard
 */
/*
function keyPressed() {
  gameOver = true;
}
*/

/**
 * Challenge 1: lose using keyboard
 */
/*
function keyReleased() {
  gameOver = true;
}
  */

/**
 * Challenge 2: lose using mouse (click)
 */
/*
function mousePressed() {
  gameOver = true;
}
*/

/**
 * Challenge 2: lose using mouse (move)
 */
/*
function mouseMoved() {
  gameOver = true;
}
*/

/**
 * Challenge 2: lose using mouse (scroll)
 */
/*
function mouseWheel() {
  gameOver = true;
}
*/

function gameOverHandler() {
  gameOver = true;
}