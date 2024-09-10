/**
 * Creating Variables
 * Marjorie Dudemaine
 * 
 * practice with custom variables
 */

"use strict";

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade = 0; // Greyscale value for the hole
let holeX = 140; // x-coordinate of the hole
let holeY = 175; // y-coordinate of the hole
let holeSize = 180; // Diameter of the hole

/**
 * create canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * draw on canvas
*/
function draw() {
    background(cheeseRed, cheeseGreen, cheeseBlue);

    push();
    noStroke();
    fill(holeShade);
    ellipse(holeX, holeY, holeSize);
    pop();
}