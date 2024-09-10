/**
 * Introducing Javascript Objects
 * Marjorie Dudemaine
 * 
 * practice with grouping a series of related variables into a single object
 */

"use strict";

let sky = {
    red: 150,
    green: 180,
    blue: 250
  };

let sun = {
    fill: {
        red: 255,
        green: 255,
        blue: 0,        
    },
    x: 500,
    y: 70,
    size: 100
};

let selfEsteem = {
    shade: 0,
    x: 320,
    y: 320,
    size: 20
};

/**
 * Create the canvas
 */
function setup() {
    // Create the canvas
    createCanvas(640, 320);
}

/**
 * Displays the sky, sun, and self-esteem
 */
function draw() {
  background(sky.red, sky.green, sky.blue);

  push();
  fill(sun.fill.red, sun.fill.green, sun.fill.blue);
  noStroke();
  ellipse(sun.x, sun.y, sun.size);
  pop();

  push();
  fill(selfEsteem.shade);
  noStroke();
  ellipse(selfEsteem.x, selfEsteem.y, selfEsteem.size);
  pop();
}