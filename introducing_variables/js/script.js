/**
 * Introducing Variables
 * Marjorie Dudemaine
 * 
 * practice with native p5 variables
 */

"use strict";

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
    background(0);

    //circle on canvas center
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(width/2, height/2, 100, 100);
    pop();

    //circle following the mouse cursor
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 100, 100);
    pop();

    //circle that changes size and color
    push();
    noStroke();
    fill(mouseX, mouseY, 0);
    ellipse(width/4, height/4, mouseX, mouseY);
}