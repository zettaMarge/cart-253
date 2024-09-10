/**
 * Changing Variables
 * Marjorie Dudemaine
 * 
 * practice with changing variables over time;
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    height: 50,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {
    skyShade = skyShade + 1;
    // Display the sky
    background(skyShade);

    ufo.y = ufo.y - 2;
    ufo.x = ufo.x + 0.5;
    ufo.fill = ufo.fill * 0.999;
    ufo.width = ufo.width / 1.005;
    ufo.height = ufo.height / 1.005;
    // Draw the UFO based on its properties
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(ufo.x, ufo.y, ufo.width, ufo.height);
    pop();
}