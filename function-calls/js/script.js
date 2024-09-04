/**
 * Austrian Pride
 * Marjorie Dudemaine
 * 
 * A representation of the Austrian flag on a canvas using the p5 tool
 */

"use strict";

/**
 * initializes a canvas on the page
*/
function setup() {
    createCanvas(640, 480);
}

/**
 * draws the Austrian flag on the canvas
*/
function draw() {
    //red background
    background(255, 75, 75);

    //white stripe
    rect(0, 160, 640, 160);
}