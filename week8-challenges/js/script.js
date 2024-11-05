/**
 * Lines
 * Pippin Barr
 * edit by Marjorie Dudemaine
 * 
 * A series of lines across the canvas
 */

"use strict";

const colourIncr = 25;
const distIncr = 50;
const canvasSize = 500;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(canvasSize, canvasSize);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour, over a rainbow gradient background
 */
function draw() {
    drawGradientBg();
    drawLines();
}

/**
 * Challenge 3: Bg For-Loop
 */
function drawGradientBg() {
    push();
    colorMode(HSB, canvasSize);

    for (let i = 0; i <= canvasSize; ++i) {
        stroke(i, canvasSize, canvasSize);
        strokeWeight(1);
        line(0, i, i, 0);
        line(width, i, i, height);
    }

    pop();
}

/**
 * Challenge 1 & 2: Horizontal/Vertical Lines While-Loop
 */
function drawLines() {
    let lineColour = 0;
    let lineWeight = 1;
    let coord = 0;

    while (coord <= canvasSize) {
        push();
        stroke(lineColour);
        strokeWeight(lineWeight);

        if (lineWeight % 2 === 0) {
            line(coord, 0, coord, height);
            line(0, coord, width, coord);
        }
        else {
            line(0, coord, width, coord);
            line(coord, 0, coord, height);
        }
        
        pop();

        lineColour += colourIncr;
        ++lineWeight;
        coord += distIncr;
    }
}