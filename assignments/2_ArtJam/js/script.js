/**
 * A Sneak Peak at the Show
 * Marjorie Dudemaine
 * 
 * desc
 */

"use strict";

const hood = {
    base: {
        x: undefined,
        y: undefined,
        w: 160,
        blue: "#31969e",
        darkBlue: "#227d85",
        red: "#cc3360",
        darkRed: "#b02851",
    },
    shadow: {
        x: undefined,
        y: undefined,
        fill: "#322e30",
        w: 125,
    },
    bell: {
        size: 25,
        gold: "#f0ba54",
        darkGold: "#cf9c3e",
    },
};

const eyes = {
    left: {
        xBase: undefined,
        fill: "#322e30",
        stroke: 250,
    },
    right: {
        xBase: undefined,
        fill: 250,
    },
    absCenterOffset: 15,

    xMouseOffset: undefined,
    xAbsMaxOffset: 25,

    yBase: undefined,
    yMouseOffset: undefined,
    yMinOffset: -20,
    yMaxOffset: 10,

    yEyebrowOffset: undefined,

    w: 15,
    h: 30,
};

const mouth = {
    top: {
        y: undefined,
        w: 150,
        h: 50,
    },
    bottom: {
        yBase: undefined,
        yMouseOffset: undefined,
        yAbsMaxOffset: 7.5,
        wBase: 140,
        h: 50,
    },
    hole: {
        y: undefined,
        h: 0,
        hMax: 60,
        w: 20,
    },
    xBase: undefined,
    fill: 240,
    stroke: 185,
};

let isLookingUp = false;
let isLookingLeft = false;
let isLookingRight = false;


/**
 * initializes the canvas and canvas size-based values
 */
function setup() {
    createCanvas(600, 600);

    hood.base.x = width/2;
    hood.base.y = height/2;

    hood.shadow.x = width/2;
    hood.shadow.y = height/2;

    eyes.left.xBase = width/2 - eyes.absCenterOffset;
    eyes.right.xBase = width/2 + eyes.absCenterOffset;
    eyes.yBase = height/2;

    mouth.xBase = width/2;
    mouth.top.y = height/2 + 37.5;
    mouth.bottom.yBase = height/2 + 50;
    mouth.hole.y = height/2 + 35;
}

/**
 * draws on the canvas
 */
function draw() {
    background(200);

    setLookWhere();

    drawHead();
    drawMovingEyes();
    drawMovingMouth();
}

/**
 * sets if eyes are looking up, and either left, right, or center
 */
function setLookWhere() {
    isLookingUp = mouseY < height/3;
    isLookingLeft = mouseX < width/3;
    isLookingRight = mouseX > 2 * width/3
}

/**
 * calls the function to draw the static head shape
 */
function drawHead() {
    drawBells();
    drawBackHorns();
    drawHorns();
    drawStripes();
    drawHood();
}

/**
 * draws the bells
 */
function drawBells() {
    push();
    fill(hood.bell.gold);
    stroke(hood.bell.darkGold);
    strokeWeight(2);

    ellipse(width/2 - 90, height/2 - 123, hood.bell.size);
    ellipse(width/2 - 125, height/2 - 60, 2*hood.bell.size/3);

    ellipse(width/2 + 90, height/2 - 123, hood.bell.size);
    ellipse(width/2 + 125, height/2 - 60, 2*hood.bell.size/3);
    pop();

    //bell holes
    push();
    fill(0);
    noStroke();
    ellipse(width/2 - 92.5, height/2 - 125.5, hood.bell.size/3);   
    ellipse(width/2 - 126, height/2 - 61, hood.bell.size/5);
    ellipse(width/2 + 92.5, height/2 - 125.5, hood.bell.size/3);
    ellipse(width/2 + 126, height/2 - 61, hood.bell.size/5);
    pop();

    push();
    fill(0);
    stroke(0);
    strokeWeight(2.5);
    line(width/2 - 92.5, height/2 - 125.5, width/2 - 97.5, height/2 - 132.5);
    line(width/2 + 92.5, height/2 - 125.5, width/2 + 97.5, height/2 - 132.5);

    strokeWeight(1.5);
    line(width/2 - 126, height/2 - 60.5, width/2 - 131, height/2 - 65.5);
    line(width/2 + 126, height/2 - 61, width/2 + 131, height/2 - 66);
    pop();
}

/**
 * draws the parts of the horns that are behind the head
 */
function drawBackHorns() {
        push();
        fill(hood.base.darkBlue);
        stroke(hood.base.darkBlue);
        strokeWeight(15);
        strokeJoin(ROUND);
        //left
        triangle(
            width/2 - 115, height/2 - 50,
            width/2 - 112, height/2 - 20,
            width/2 - 100, height/2 - 50
        );
        //right
        triangle(
            width/2 + 115, height/2 - 50,
            width/2 + 112, height/2 - 20,
            width/2 + 100, height/2 - 50
        );
        pop();

        push();
        fill(hood.base.darkRed);
        stroke(hood.base.darkRed);
        strokeWeight(30);
        strokeJoin(ROUND);
        arc(
            hood.base.x,
            hood.base.y - 25,
            210,
            75,
            0 - QUARTER_PI,
            PI + QUARTER_PI,
            PIE
        );
        pop();
}

/**
 * draws the front parts of the horns
 */
function drawHorns() {
    push();
    fill(hood.base.red);
    stroke(hood.base.red);
    strokeWeight(30);
    strokeJoin(ROUND);

    //left
    triangle(
        width/2 - 80, height/2 - 100,
        width/2 - 95, height/2 - 50,
        width/2 - 20, height/2 - 70
    );

    //right
    triangle(
        width/2 + 80, height/2 - 100,
        width/2 + 95, height/2 - 50,
        width/2 + 20, height/2 - 70
    );

    arc(
        hood.base.x,
        hood.base.y - 37,
        195,
        100,
        0 - QUARTER_PI,
        PI + QUARTER_PI,
        PIE
    );
    pop();
}

/**
 * draws the stripes on the horns
 */
function drawStripes() {
    push();
    fill(hood.base.blue);
    noStroke();

    beginShape();
    vertex(width/2 - 54, height/2 - 104);
    vertex(width/2 - 101, height/2 - 82);
    vertex(width/2 - 110.75, height/2 - 50);
    vertex(width/2 - 26, height/2 - 90);
    endShape();

    beginShape();
    vertex(width/2 + 54, height/2 - 104);
    vertex(width/2 + 101, height/2 - 82);
    vertex(width/2 + 110.75, height/2 - 50);
    vertex(width/2 + 26, height/2 - 90);
    endShape();
    pop();

    //round the top with blue
    push();
    fill(hood.base.blue);
    noStroke();

    beginShape();
    curveVertex(width/2 - 54, height/2 - 50);
    curveVertex(width/2 - 54, height/2 - 103.75);
    curveVertex(width/2 - 101, height/2 - 81.75);
    curveVertex(width/2 - 101, height/2);
    endShape();

    beginShape();
    curveVertex(width/2 + 54, height/2 - 50);
    curveVertex(width/2 + 54, height/2 - 103.75);
    curveVertex(width/2 + 101, height/2 - 81.75);
    curveVertex(width/2 + 101, height/2);
    endShape();
    pop();

    //round the bottom with red
    push();
    fill(hood.base.red);
    noStroke();

    beginShape();
    curveVertex(width/2 - 110.75, height/2 + 50);
    curveVertex(width/2 - 110.25, height/2 - 50);
    curveVertex(width/2 - 26.25, height/2 - 89.75);
    curveVertex(width/2 - 26, height/2 - 45);
    endShape();

    beginShape();
    curveVertex(width/2 + 110.75, height/2 + 50);
    curveVertex(width/2 + 110.25, height/2 - 50);
    curveVertex(width/2 + 26.25, height/2 - 89.75);
    curveVertex(width/2 + 26, height/2 - 45);
    endShape();
    pop();
}

/**
 * draws the hooded face
 */
function drawHood() {
        //base
        push();
        fill(hood.base.blue);
        noStroke();
        arc(
            hood.base.x,
            hood.base.y,
            hood.base.w,
            90,
            0,
            PI
        );
        arc(
            hood.base.x,
            hood.base.y,
            hood.base.w,
            160,
            PI,
            0
        );
        pop();

        //hole and shadow
        push();
        fill(hood.base.darkBlue);
        stroke(hood.base.darkBlue);
        strokeWeight(3);

        arc(
            hood.shadow.x,
            hood.shadow.y,
            hood.shadow.w,
            107.5,
            PI,
            0
        );

        arc(
            hood.shadow.x,
            hood.shadow.y,
            hood.shadow.w,
            67.5,
            0,
            PI
        );
        pop();
    
        push();
        fill(hood.shadow.fill);
        noStroke();

        arc(
            hood.shadow.x,
            hood.shadow.y,
            hood.shadow.w,
            75,
            0,
            PI
        );

        arc(
            hood.shadow.x,
            hood.shadow.y,
            hood.shadow.w,
            100,
            PI,
            0
        );
        pop();
}

/**
 * draws the eyes, depending on the mouse cursor location
 */
function drawMovingEyes() {
    eyes.xMouseOffset = map(
        mouseX,
        0, width,
        -eyes.xAbsMaxOffset, eyes.xAbsMaxOffset,
        true
    );
    eyes.yMouseOffset = map(
        mouseY,
        0, height,
        eyes.yMinOffset, eyes.yMaxOffset,
        true
    );

    eyes.yEyebrowOffset = map(
        mouseY,
        0, height/3,
        -19.5, -15,
        true
    );
    
    //left eye
    push();
    fill(eyes.left.fill);
    stroke(eyes.left.stroke);
    strokeWeight(2);
    ellipse(
        eyes.left.xBase + eyes.xMouseOffset, 
        eyes.yBase + eyes.yMouseOffset,
        eyes.w -2,
        eyes.h -2
    );
    pop();

    if (!isLookingUp || !isLookingLeft) {
        //left eyebrow
        push();
        noFill();
        stroke(eyes.left.stroke);
        strokeWeight(1);
        arc(
            eyes.left.xBase + eyes.xMouseOffset, 
            eyes.yBase + eyes.yEyebrowOffset + eyes.yMouseOffset,
            eyes.w + 2,
            15,
            PI + QUARTER_PI,
            0 - QUARTER_PI
        );
        pop();
    } 

    //right eye
    push();
    fill(eyes.right.fill);
    noStroke();
    ellipse(
        eyes.right.xBase + eyes.xMouseOffset,
        eyes.yBase + eyes.yMouseOffset,
        eyes.w,
        eyes.h
    );
    pop();

    if (!isLookingUp || !isLookingRight) {
        //right eyebrow
        push();
        noFill();
        stroke(eyes.left.stroke);
        strokeWeight(1);
        arc(
            eyes.right.xBase + eyes.xMouseOffset, 
            eyes.yBase + eyes.yEyebrowOffset  + eyes.yMouseOffset,
            eyes.w + 2,
            15,
            PI + QUARTER_PI,
            0 - QUARTER_PI
        );
        pop();
    }
}

/**
 * draws the mouth, opening it depending on the mouse cursor location
 */
function drawMovingMouth() {
    //base top part
    push();
    fill(mouth.fill);
    noStroke();
    ellipse(mouth.xBase, mouth.top.y, mouth.top.w, mouth.top.h);
    pop();

    if (isLookingUp) {    
        mouth.hole.h = map(mouseY,
            height/3, 0,
            0, mouth.hole.hMax,
            true
        ); 

        mouth.bottom.yMouseOffset = map(
            mouseY,
            height/3, 0,
            0, mouth.bottom.yAbsMaxOffset,
            true
        );

        //base bottom part
        push();
        fill(mouth.fill);
        noStroke();
        ellipse(
            mouth.xBase,
            mouth.bottom.yBase + mouth.bottom.yMouseOffset,
            mouth.bottom.wBase - mouth.bottom.yMouseOffset,
            mouth.bottom.h
        );
        pop();

        //mouth hole
        push();
        fill(hood.shadow.fill);
        stroke(mouth.stroke - 45);
        strokeWeight(2);
        arc(mouth.xBase, mouth.hole.y, mouth.hole.w, mouth.hole.h , 0, PI);
        pop();
    }
    else {
        //base bottom part
        push();
        fill(mouth.fill);
        noStroke();
        ellipse(mouth.xBase, mouth.bottom.yBase, mouth.bottom.wBase, mouth.bottom.h);
        pop();
    }

    //top jaw
    angleMode(DEGREES);

    push();
    fill(mouth.fill);
    stroke(mouth.stroke);
    strokeJoin(ROUND);
    strokeWeight(4);

    //down curves
    arc(
        mouth.xBase - 54,
        height/2 + 36,
        22.5,
        45,
        47.5,
        110
    );
    arc(
        mouth.xBase - 17.5,
        height/2 + 25,
        35,
        60,
        15,
        132.5
    );
    arc(
        mouth.xBase + 17.5,
        height/2 + 25,
        35,
        60,
        47.5,
        165
    );
    arc(
        mouth.xBase + 54,
        height/2 + 36,
        22.5,
        45,
        70,
        132.5
    );
    
    //up curves
    arc(
        mouth.xBase + 38,
        height/2 + 46.5,
        12,
        25,
        232.5,
        350
    );
    arc(
        mouth.xBase - 38,
        height/2 + 46.5,
        12,
        25,
        190,
        307.5
    );
    pop();

    angleMode(RADIANS);
}