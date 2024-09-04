/**
 * Prunsel
 * Marjorie Dudemaine
 * 
 * A representation of a giant eye on a canvas using the p5 tool
 */

"use strict";

/**
 * initializes a canvas on the page
*/
function setup() {
    createCanvas(640, 640);
}

/**
 * draws a big eye on the canvas
*/
function draw() {
    background(150, 150, 150);

    //white base for the eye
    push();
    fill(255);
    stroke(255, 255, 255);
    ellipse(320, 320, 480, 480);
    pop();

    //eye's dark iris
    push();
    fill(25);
    noStroke();
    ellipse(320, 320, 300, 300);
    pop();

    //eye's pupil
    push();
    fill(0);
    stroke(35, 35, 35);
    ellipse(320, 320, 75, 75);
    pop();

    //eye's shine
    push();
    fill(255);
    noStroke();
    ellipse(225, 275, 50, 50);
    pop();
}