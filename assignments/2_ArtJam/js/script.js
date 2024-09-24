/**
 * A Sneak Peak at the Show
 * Marjorie Dudemaine
 * 
 * desc
 */

"use strict";

const clownBoy = {
    hood: {
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
    },

    eyes: {
        left: {
            name: "left",
            xBase: undefined,
            fill: "#322e30",
            stroke: 250,
        },
        right: {
            name: "right",
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
    },

    mouth: {
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
    },

    isLookingUp: false,
    isLookingLeft: false,
    isLookingRight: false,

    isHappy: false,
    isDispleased: false,
};

const flowers = {
    center: {
        fill: "#ffd585",
        size: 30,
    },
    petal: {
        fill: "#f57399",
        size: 25,
        lengthModifier: 20,
    },
    leaf: {
        fill:"#5cb567",
        size: 15,
        lengthModifier: 30,
    },
    timer: 3,
    timerStart: 3,
    isSpinning: false,
};

const flower1 = {
    x: undefined,
    y: undefined,
    petalAngleA: 0,
    petalAngleB: 1.5707,
    petalAngleC: 3.1415,
    petalAngleD: 4.7123,
    leafAngle: 3.9269,
    spinRate: 0.05,
};

const flower2 = {
    x: undefined,
    y: undefined,
    petalAngleA: 0.7853,
    petalAngleB: 2.3561,
    petalAngleC: 3.9269,
    petalAngleD: 5.4977,
    leafAngle: 4.7123,
    spinRate: 0.065
};

const flower3 = {
    x: undefined,
    y: undefined,
    petalAngleA: 0,
    petalAngleB: 1.5707,
    petalAngleC: 3.1415,
    petalAngleD: 4.7123,
    leafAngle: 5.4977,
    spinRate: 0.04
};

const shapeSpace = {
    xMin: undefined,
    xMax: undefined,
    yMin: undefined,
    yMax: undefined
};

const square = {
    object: {
        x: 0,
        y: 0,
        size: 0,
        fill: 0,
        isDisappear: false,
    },
    hole: {
        x: undefined,
        y: undefined,
        size: 0,
        isOverlap: false,
    },
};

const circle = {
    object: {
        x: 0,
        y: 0,
        size: 0,
        fill: 0,
        isDisappear: false,
    },
    hole: {
        x: undefined,
        y: undefined,
        size: 0,
        isOverlap: false,
    },
}

//rectMode(CENTER);

/**
 * initializes the canvas and values based on canvas size
 */
function setup() {
    createCanvas(600, 600);

    clownBoy.hood.base.x = width/2;
    clownBoy.hood.base.y = 2 * height/3;

    clownBoy.hood.shadow.x = width/2;
    clownBoy.hood.shadow.y = 2 * height/3;

    clownBoy.eyes.left.xBase = width/2 - clownBoy.eyes.absCenterOffset;
    clownBoy.eyes.right.xBase = width/2 + clownBoy.eyes.absCenterOffset;
    clownBoy.eyes.yBase = 2 * height/3;

    clownBoy.mouth.xBase = width/2;
    clownBoy.mouth.top.y = 2 * height/3 + 37.5;
    clownBoy.mouth.bottom.yBase = 2 * height/3 + 50;
    clownBoy.mouth.hole.y = 2 * height/3 + 35;

    flower1.x = width/5;
    flower1.y = height/2;

    flower2.x = width/2.5;
    flower2.y = height/3;

    flower3.x = 4 * width/5;
    flower3.y = 2 * height/3;
}

/**
 * draws on the canvas
 */
function draw() {
    background(200);

    setClownLookWhere();

    drawHead();
    drawMovingEyes();
    drawMovingMouth();

    if (clownBoy.isHappy) {
        //boost flower opacity from 0?
        drawFlower(flower1);
        drawFlower(flower2);
        drawFlower(flower3);
        rotateFlowers();

        if (frameCount % 60 == 0 && flowers.timer > 0) {
            --flowers.timer;
        }

        if (flowers.timer == 0) {
            clownBoy.isHappy = false;
            flowers.timer = flowers.timerStart;
            //reset flower opacity to 0?
        }
    }

    //draw holes
    //draw/move shapes

    //for distances, TODO remove
    ellipse(9 * width/10, height/3, 25);
    ellipse(width/10, height/10, 25);
}

/**
 * sets if eyes are looking up, and either left, right, or center
 */
function setClownLookWhere() {
    clownBoy.isLookingUp = mouseY < height/3;
    clownBoy.isLookingLeft = mouseX < width/3;
    clownBoy.isLookingRight = mouseX > 2 * width/3

    clownBoy.eyes.xMouseOffset = map(
        mouseX,
        0, width,
        -clownBoy.eyes.xAbsMaxOffset, clownBoy.eyes.xAbsMaxOffset,
        true
    );
    clownBoy.eyes.yMouseOffset = map(
        mouseY,
        height/10, height,
        clownBoy.eyes.yMinOffset, clownBoy.eyes.yMaxOffset,
        true
    );

    clownBoy.eyes.yEyebrowOffset = map(
        mouseY,
        height/10, height/3,
        -19.5, -15,
        true
    );
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
    fill(clownBoy.hood.bell.gold);
    stroke(clownBoy.hood.bell.darkGold);
    strokeWeight(2);

    ellipse(width/2 - 90, 2 * height/3 - 123, clownBoy.hood.bell.size);
    ellipse(width/2 - 125, 2 * height/3 - 60, 2 * clownBoy.hood.bell.size/3);

    ellipse(width/2 + 90, 2 * height/3 - 123, clownBoy.hood.bell.size);
    ellipse(width/2 + 125, 2 * height/3 - 60, 2 * clownBoy.hood.bell.size/3);
    pop();

    //bell holes
    push();
    fill(0);
    noStroke();
    ellipse(width/2 - 92.5, 2 * height/3 - 125.5, clownBoy.hood.bell.size/3);   
    ellipse(width/2 - 126, 2 * height/3 - 61, clownBoy.hood.bell.size/5);
    ellipse(width/2 + 92.5, 2 * height/3 - 125.5, clownBoy.hood.bell.size/3);
    ellipse(width/2 + 126, 2 * height/3 - 61, clownBoy.hood.bell.size/5);
    pop();

    push();
    fill(0);
    stroke(0);
    strokeWeight(2.5);
    line(width/2 - 92.5, 2 * height/3 - 125.5, width/2 - 97.5, 2 * height/3 - 132.5);
    line(width/2 + 92.5, 2 * height/3 - 125.5, width/2 + 97.5, 2 * height/3 - 132.5);

    strokeWeight(1.5);
    line(width/2 - 126, 2 * height/3 - 60.5, width/2 - 131, 2 * height/3 - 65.5);
    line(width/2 + 126, 2 * height/3 - 61, width/2 + 131, 2 * height/3 - 66);
    pop();
}

/**
 * draws the parts of the horns that are behind the head
 */
function drawBackHorns() {
        push();
        fill(clownBoy.hood.base.darkBlue);
        stroke(clownBoy.hood.base.darkBlue);
        strokeWeight(15);
        strokeJoin(ROUND);
        //left
        triangle(
            width/2 - 115, 2 * height/3 - 50,
            width/2 - 112, 2 * height/3 - 20,
            width/2 - 100, 2 * height/3 - 50
        );
        //right
        triangle(
            width/2 + 115, 2 * height/3 - 50,
            width/2 + 112, 2 * height/3 - 20,
            width/2 + 100, 2 * height/3 - 50
        );
        pop();

        push();
        fill(clownBoy.hood.base.darkRed);
        stroke(clownBoy.hood.base.darkRed);
        strokeWeight(30);
        strokeJoin(ROUND);
        arc(
            clownBoy.hood.base.x,
            clownBoy.hood.base.y - 25,
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
    fill(clownBoy.hood.base.red);
    stroke(clownBoy.hood.base.red);
    strokeWeight(30);
    strokeJoin(ROUND);

    //left
    triangle(
        width/2 - 80, 2 * height/3 - 100,
        width/2 - 95, 2 * height/3 - 50,
        width/2 - 20, 2 * height/3 - 70
    );

    //right
    triangle(
        width/2 + 80, 2 * height/3 - 100,
        width/2 + 95, 2 * height/3 - 50,
        width/2 + 20, 2 * height/3 - 70
    );

    arc(
        clownBoy.hood.base.x,
        clownBoy.hood.base.y - 37,
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
    fill(clownBoy.hood.base.blue);
    noStroke();

    beginShape();
    vertex(width/2 - 54, 2 * height/3 - 104);
    vertex(width/2 - 101, 2 * height/3 - 82);
    vertex(width/2 - 110.75, 2 * height/3 - 50);
    vertex(width/2 - 26, 2 * height/3 - 90);
    endShape();

    beginShape();
    vertex(width/2 + 54, 2 * height/3 - 104);
    vertex(width/2 + 101, 2 * height/3 - 82);
    vertex(width/2 + 110.75, 2 * height/3 - 50);
    vertex(width/2 + 26, 2 * height/3 - 90);
    endShape();
    pop();

    //round the top with blue
    push();
    fill(clownBoy.hood.base.blue);
    noStroke();

    beginShape();
    curveVertex(width/2 - 54, 2 * height/3 - 50);
    curveVertex(width/2 - 54, 2 * height/3 - 103.75);
    curveVertex(width/2 - 101, 2 * height/3 - 81.75);
    curveVertex(width/2 - 101, 2 * height/3);
    endShape();

    beginShape();
    curveVertex(width/2 + 54, 2 * height/3 - 50);
    curveVertex(width/2 + 54, 2 * height/3 - 103.75);
    curveVertex(width/2 + 101, 2 * height/3 - 81.75);
    curveVertex(width/2 + 101, 2 * height/3);
    endShape();
    pop();

    //round the bottom with red
    push();
    fill(clownBoy.hood.base.red);
    noStroke();

    beginShape();
    curveVertex(width/2 - 110.75, 2 * height/3 + 50);
    curveVertex(width/2 - 110.25, 2 * height/3 - 50);
    curveVertex(width/2 - 26.25, 2 * height/3 - 89.75);
    curveVertex(width/2 - 26, 2 * height/3 - 45);
    endShape();

    beginShape();
    curveVertex(width/2 + 110.75, 2 * height/3 + 50);
    curveVertex(width/2 + 110.25, 2 * height/3 - 50);
    curveVertex(width/2 + 26.25, 2 * height/3 - 89.75);
    curveVertex(width/2 + 26, 2 * height/3 - 45);
    endShape();
    pop();
}

/**
 * draws the hooded face
 */
function drawHood() {
        //base
        push();
        fill(clownBoy.hood.base.blue);
        noStroke();
        arc(
            clownBoy.hood.base.x,
            clownBoy.hood.base.y,
            clownBoy.hood.base.w,
            90,
            0,
            PI
        );
        arc(
            clownBoy.hood.base.x,
            clownBoy.hood.base.y,
            clownBoy.hood.base.w,
            160,
            PI,
            0
        );
        pop();

        //hole and shadow
        push();
        fill(clownBoy.hood.base.darkBlue);
        stroke(clownBoy.hood.base.darkBlue);
        strokeWeight(3);

        arc(
            clownBoy.hood.shadow.x,
            clownBoy.hood.shadow.y,
            clownBoy.hood.shadow.w,
            107.5,
            PI,
            0
        );

        arc(
            clownBoy.hood.shadow.x,
            clownBoy.hood.shadow.y,
            clownBoy.hood.shadow.w,
            67.5,
            0,
            PI
        );
        pop();
    
        push();
        fill(clownBoy.hood.shadow.fill);
        noStroke();

        arc(
            clownBoy.hood.shadow.x,
            clownBoy.hood.shadow.y,
            clownBoy.hood.shadow.w,
            75,
            0,
            PI
        );

        arc(
            clownBoy.hood.shadow.x,
            clownBoy.hood.shadow.y,
            clownBoy.hood.shadow.w,
            100,
            PI,
            0
        );
        pop();
}

/**
 * draws an eye, in a certain mood, looking in a certain direction
 * @param {*} eye which eye to draw
 * @param {boolean} lookingInDirection 
 */
function drawEye(eye, lookingInDirection) {
    push();
    if (clownBoy.isHappy) {
        noFill();
        stroke(clownBoy.eyes.left.stroke);
        strokeWeight(3);
        arc(
            eye.xBase + clownBoy.eyes.xMouseOffset,
            clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset,
            clownBoy.eyes.w -2,
            clownBoy.eyes.h -2,
            PI,
            0
        );
    } 
    else if (clownBoy.isDispleased) {
        noFill();
        stroke(clownBoy.eyes.left.stroke);
        strokeWeight(3);

        if (eye.name == "left") {
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset - 5,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - clownBoy.eyes.h/4,
                eye.xBase + clownBoy.eyes.xMouseOffset + clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset
            );
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset + clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset,
                eye.xBase + clownBoy.eyes.xMouseOffset,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset + clownBoy.eyes.h/4,
            );
        }
        else {
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset + 5,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - clownBoy.eyes.h/4,
                eye.xBase + clownBoy.eyes.xMouseOffset - clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset
            );
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset - clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset,
                eye.xBase + clownBoy.eyes.xMouseOffset,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset + clownBoy.eyes.h/4,
            );
        }
    }
    else {
        fill(eye.fill);

        if (Object.hasOwn(eye, "stroke")) {
            stroke(eye.stroke);
            strokeWeight(2);
        }
        else {
            noStroke();
        }

        ellipse(
            eye.xBase + clownBoy.eyes.xMouseOffset, 
            clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset,
            clownBoy.eyes.w -2,
            clownBoy.eyes.h -2
        ); 
    }
    pop();

    //eyebrow
    push();
    if (clownBoy.isDispleased) {
        noFill();
        stroke(clownBoy.eyes.left.stroke);
        strokeWeight(1);
        if (eye.name == "left") {
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - clownBoy.eyes.h/4 - 10,
                eye.xBase + clownBoy.eyes.xMouseOffset + clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - 10
            );
        }
        else {
            line(
                eye.xBase + clownBoy.eyes.xMouseOffset,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - clownBoy.eyes.h/4 - 10,
                eye.xBase + clownBoy.eyes.xMouseOffset - clownBoy.eyes.w/2,
                clownBoy.eyes.yBase + clownBoy.eyes.yMouseOffset - 10
            );
        }
    }
    else if (!clownBoy.isLookingUp || !lookingInDirection) {  
        
        noFill();
        stroke(clownBoy.eyes.left.stroke);
        strokeWeight(1);
            arc(
                eye.xBase + clownBoy.eyes.xMouseOffset, 
                clownBoy.eyes.yBase + clownBoy.eyes.yEyebrowOffset + clownBoy.eyes.yMouseOffset,
                clownBoy.eyes.w + 2,
                15,
                PI + QUARTER_PI,
                0 - QUARTER_PI
            );
    } 
    pop();
}

/**
 * draws the eyes
 */
function drawMovingEyes() {
    drawEye(clownBoy.eyes.left, clownBoy.isLookingLeft);
    drawEye(clownBoy.eyes.right, clownBoy.isLookingRight);
}

/**
 * draws the mouth, opening it depending on the mouse cursor location or mood
 */
function drawMovingMouth() {
    //top jaw
    push();
    fill(clownBoy.mouth.fill);
    noStroke();
    ellipse(clownBoy.mouth.xBase, clownBoy.mouth.top.y, clownBoy.mouth.top.w, clownBoy.mouth.top.h);
    pop();

    if (clownBoy.isHappy) {
        drawBottomJaw();
    }
    else if (clownBoy.isDispleased) {
        drawBottomJaw();
        drawMouthHole(clownBoy.mouth.hole.hMax/2, clownBoy.mouth.hole.w + 10);
    }
    else if (clownBoy.isLookingUp) {    
        clownBoy.mouth.hole.h = map(mouseY,
            height/3, height/10,
            0, clownBoy.mouth.hole.hMax,
            true
        ); 

        clownBoy.mouth.bottom.yMouseOffset = map(
            mouseY,
            height/3, height/10,
            0, clownBoy.mouth.bottom.yAbsMaxOffset,
            true
        );

        drawBottomJaw(clownBoy.mouth.bottom.yMouseOffset, -clownBoy.mouth.bottom.yMouseOffset);
        drawMouthHole(clownBoy.mouth.hole.h);
    }
    else {
        drawBottomJaw();
    }

    drawTeeth();
}

/**
 * draws the bottom jaw at a certain position and with a certain width
 * @param {Number} yOffset by how much the jaw needs to be moved down from its base position
 * @param {Number} wOffset by how much the jaw's width is affected from its base value
 */
function drawBottomJaw(yOffset = 0, wOffset = 0) {
    push();
    fill(clownBoy.mouth.fill);
    noStroke();
    ellipse(
        clownBoy.mouth.xBase,
        clownBoy.mouth.bottom.yBase + yOffset,
        clownBoy.mouth.bottom.wBase + wOffset,
        clownBoy.mouth.bottom.h
    );
    pop();
}

/**
 * draws the mouth to be open a certain amount
 * @param {Number} openHeight how much the mouth is open
 * @param {Number} openWidth how wide the mouth is
 */
function drawMouthHole(openHeight, openWidth = clownBoy.mouth.hole.w) {
    push();
    fill(clownBoy.hood.shadow.fill);
    stroke(clownBoy.mouth.stroke - 45);
    strokeWeight(2);
    arc(clownBoy.mouth.xBase, clownBoy.mouth.hole.y, openWidth, openHeight, 0, PI);
    pop();
}

/**
 * draws the "teeth"
 */
function drawTeeth() {
    angleMode(DEGREES);

    push();
    fill(clownBoy.mouth.fill);
    stroke(clownBoy.mouth.stroke);
    strokeJoin(ROUND);
    strokeWeight(4);

    //down curves
    arc(
        clownBoy.mouth.xBase - 54,
        2 * height/3 + 36,
        22.5,
        45,
        47.5,
        110
    );
    arc(
        clownBoy.mouth.xBase - 17.5,
        2 * height/3 + 25,
        35,
        60,
        15,
        132.5
    );
    arc(
        clownBoy.mouth.xBase + 17.5,
        2 * height/3 + 25,
        35,
        60,
        47.5,
        165
    );
    arc(
        clownBoy.mouth.xBase + 54,
        2 * height/3 + 36,
        22.5,
        45,
        70,
        132.5
    );
    
    //up curves
    arc(
        clownBoy.mouth.xBase + 38,
        2 * height/3 + 46.5,
        12,
        25,
        232.5,
        350
    );
    arc(
        clownBoy.mouth.xBase - 38,
        2 * height/3 + 46.5,
        12,
        25,
        190,
        307.5
    );
    pop();

    angleMode(RADIANS);
}

/**
 * draws a flower
 * @param {*} flower specific flower object
 */
function drawFlower(flower) {
    //leaf
    push();
    strokeWeight(flowers.leaf.size);
    stroke(flowers.leaf.fill);
    const xL2 = flower.x + sin(flower.leafAngle) * flowers.leaf.lengthModifier;
    const yL2 = flower.y + cos(flower.leafAngle) * flowers.leaf.lengthModifier;
    line(flower.x, flower.y, xL2, yL2);
    pop();

    //petals, A to D clockwise from the top
    push();
    strokeWeight(flowers.petal.size);
    stroke(flowers.petal.fill);

    const xA2 = flower.x + sin(flower.petalAngleA) * flowers.petal.lengthModifier;
    const yA2 = flower.y + cos(flower.petalAngleA) * flowers.petal.lengthModifier;
    line(flower.x, flower.y, xA2, yA2);

    const xB2 = flower.x + sin(flower.petalAngleB) * flowers.petal.lengthModifier;
    const yB2 = flower.y + cos(flower.petalAngleB) * flowers.petal.lengthModifier;
    line(flower.x, flower.y, xB2, yB2);

    const xC2 = flower.x + sin(flower.petalAngleC) * flowers.petal.lengthModifier;
    const yC2 = flower.y + cos(flower.petalAngleC) * flowers.petal.lengthModifier;
    line(flower.x, flower.y, xC2, yC2);

    const xD2 = flower.x + sin(flower.petalAngleD) * flowers.petal.lengthModifier;
    const yD2 = flower.y + cos(flower.petalAngleD) * flowers.petal.lengthModifier;
    line(flower.x, flower.y, xD2, yD2);
    pop();

    //center
    push();
    noStroke();
    fill(flowers.center.fill);
    ellipse(flower.x, flower.y, flowers.center.size);
    pop();
}

function rotateFlowers() {
    flower1.petalAngleA -= flower1.spinRate;
    flower1.petalAngleB -= flower1.spinRate;
    flower1.petalAngleC -= flower1.spinRate;
    flower1.petalAngleD -= flower1.spinRate;
    flower1.leafAngle -= flower1.spinRate;

    flower2.petalAngleA -= flower2.spinRate;
    flower2.petalAngleB -= flower2.spinRate;
    flower2.petalAngleC -= flower2.spinRate;
    flower2.petalAngleD -= flower2.spinRate;
    flower2.leafAngle -= flower2.spinRate;

    flower3.petalAngleA -= flower3.spinRate;
    flower3.petalAngleB -= flower3.spinRate;
    flower3.petalAngleC -= flower3.spinRate;
    flower3.petalAngleD -= flower3.spinRate;
    flower3.leafAngle -= flower3.spinRate;
}