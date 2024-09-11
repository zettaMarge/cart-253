/**
 * Mr Furious Challenge
 * Marjorie Dudemaine
 * 
 * guy's about to get real pissed
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
    // Position and size
    x: 200,
    y: 200,
    size: 100,
    // Colour
    fill: {
      r: 255,
      g: 225,
      b: 225,
      minValue: 75
    },
    angerRate: -0.5,
    shake: {
        multiplier: 0,
        maxMultiplier: 1,
        maxRandom: 10,
        rate: 0.001,
    }
  };

let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200,
        minValue: 0,
    },
    changeRate: {
        r: -0.5,
        g: -0.5,
        b: -0.4,
    }
}

let bird = {
    beak: {
        x: 60,
        y: 145,
        w: 20,
        h: 10,
        hex: "#de9d35",
    },
    body: {
        x: 45,
        y: 145,
        size: 35,
        fill: 255,
    },
    eye: {
        x: 55,
        y: 140,
        size: 5,
        fill: 0,
    },
    tail: {
        x: 25,
        y: 145,
        w: 45,
        h: 10,
        fill: 255,
    },
    velocity: {
        x: 0,
        y: 1,
    },
    minVelocity: {
      x: -5,
      y: -2, 
    },
    maxVelocity: {
        x: 5,
        y: 2,
    },
    acceleration: {
        x: 0.045,
        y: -0.025,
    },
    minY: 25,
    maxY: 140,
}
  
/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    DarkenSky();

    //draw the sky
    background(sky.fill.r, sky.fill.g, sky.fill.b);

    AngerMrFurious();
    DrawMrFurious();

    MoveBird();
    DrawBird();
}

/**
 * Draw Mr. Furious as a coloured circle
 */
function DrawMrFurious() {

    push();
    noStroke();
    fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);

    //Challenge 4: shake with rage
    //let shakeX = random(10);
    //let shakeY = random(10);
    //ellipse(mrFurious.x + shakeX, mrFurious.y + shakeY, mrFurious.size);

    //Challenge 5: shake more over time
    mrFurious.shake.multiplier += mrFurious.shake.rate;
    mrFurious.shake.multiplier = constrain(mrFurious.shake.multiplier, 0, mrFurious.shake.maxMultiplier);
    let shakeX = random(mrFurious.shake.maxRandom) * mrFurious.shake.multiplier;
    let shakeY = random(mrFurious.shake.maxRandom) * mrFurious.shake.multiplier;

    ellipse(mrFurious.x + shakeX, mrFurious.y + shakeY, mrFurious.size);
    pop();
}

/**
 * Challenge 1: gets more red as time goes on
 */
function AngerMrFurious() {
    mrFurious.fill.g += mrFurious.angerRate;
    mrFurious.fill.b += mrFurious.angerRate;
    mrFurious.fill.g = constrain(mrFurious.fill.g, mrFurious.fill.minValue, 225);
    mrFurious.fill.b = constrain(mrFurious.fill.b, mrFurious.fill.minValue, 225);
}

/**
 * Challenge 2: day/night cycle
 */
function DarkenSky() {
    sky.fill.r += sky.changeRate.r;
    sky.fill.g += sky.changeRate.g;
    sky.fill.b += sky.changeRate.b;
    sky.fill.r = constrain(sky.fill.r, sky.fill.minValue, 160);
    sky.fill.g = constrain(sky.fill.g, sky.fill.minValue, 180);
    sky.fill.b = constrain(sky.fill.b, sky.fill.minValue, 200);
}

/**
 * Challenge 3: bird
 */
function DrawBird() {
    //beak
    push();
    noStroke();
    fill(bird.beak.hex);
    ellipse(bird.beak.x, bird.beak.y, bird.beak.w, bird.beak.h);
    pop();

    //body
    push();
    noStroke();
    fill(bird.body.fill);
    ellipse(bird.body.x, bird.body.y, bird.body.size);
    pop();

    //eye
    push();
    noStroke();
    fill(bird.eye.fill);
    ellipse(bird.eye.x, bird.eye.y, bird.eye.size);
    pop();

    //tail
    push();
    noStroke();
    fill(bird.tail.fill);
    ellipse(bird.tail.x, bird.tail.y, bird.tail.w, bird.tail.h);
    pop();
}

function MoveBird() {
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.y += bird.acceleration.y;
    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);
    
    //beak
    bird.beak.x += bird.velocity.x;
    bird.beak.y += bird.velocity.y;
    bird.beak.y = constrain(bird.beak.y, bird.minY, bird.maxY);

    //body
    bird.body.x += bird.velocity.x;
    bird.body.y += bird.velocity.y;
    bird.body.y = constrain(bird.body.y, bird.minY, bird.maxY);

    //eye
    bird.eye.x += bird.velocity.x;
    bird.eye.y += bird.velocity.y;
    bird.eye.y = constrain(bird.eye.y, bird.minY - 5, bird.maxY);

    //tail
    bird.tail.x += bird.velocity.x;
    bird.tail.y += bird.velocity.y;
    bird.tail.y = constrain(bird.tail.y, bird.minY, bird.maxY);
}