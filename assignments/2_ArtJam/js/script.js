/**
 * A Sneak Peak at the Show
 * Marjorie Dudemaine
 * 
 * A simple game of Match The Shapes, featuring my adorable baby boy clown :)
 * Somewhat inspired by that one Tiktok where every object fits in the square hole.
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

const shapeHoleSpace = {
    xMin: undefined,
    xMax: undefined,
    yMin: undefined,
    yMax: undefined,
    minDiff: 85,
};

const squareObject = {
    moving: {
        x: 0,
        y: 0,
        size: 75,
        fill: {
            r: 117,
            g: 209,
            b: 128,
            a: 255,
        },
        isDisappear: false,
        isMoving: false,
        isMisplaced: false,
    },
    hole: {
        x: undefined,
        y: undefined,
        size: 80,
    },
};

const circleObject = {
    moving: {
        x: 0,
        y: 0,
        size: 77,
        fill: {
            r: 245,
            g: 164,
            b: 93,
            a: 255,
        },
        isDisappear: false,
        isMoving: false,
        isMisplaced: false,
    },
    hole: {
        x: undefined,
        y: undefined,
        size: 80,
    },
}

const triangleObject = {
    moving: {
        xCenter: 0,
        yCenter: 0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        x3: 0,
        y3: 0,
        distCenterPoint: 35,
        fill: {
            r: 247,
            g: 141,
            b: 172,
            a: 255,
        },
        isDisappear: false,
        isMoving: false,
        isMisplaced: false,
    },
    hole: {
        xCenter: undefined,
        yCenter: undefined,
        x1: undefined,
        y1: undefined,
        x2: undefined,
        y2: undefined,
        x3: undefined,
        y3: undefined,
        distCenterPoint: 37,
    },
};

const reloadBtn = {
    x: undefined,
    y: undefined,
    w: 144,
    h: 72,
    fill: {
        base: 255,
        hover: "#8be8f0",
    },
    stroke: "#227d85",
    txtSize: 28,
};

class Flower {
    constructor(x, y, petalAngleA, petalAngleB, petalAngleC, petalAngleD, leafAngle, spinRate) {
        this.x = x;
        this.y = y;
        this.petalAngleA = petalAngleA;
        this.petalAngleB = petalAngleB;
        this.petalAngleC = petalAngleC;
        this.petalAngleD = petalAngleD;
        this.leafAngle = leafAngle;
        this.spinRate = spinRate;
    }

    fill = {
        center: "#ffd585",
        petal: "#f57399",
        leaf: "#5cb567",
    };

    size = {
        center: 30,
        petal: 25,
        leaf: 15,
    };
    
    lengthModifier = {
        petal: 20,
        leaf: 30,
    };

    /**
     * rotates the angle of the flower's petals and leaf, clockwise
     */
    rotate() {
        this.petalAngleA -= this.spinRate;
        this.petalAngleB -= this.spinRate;
        this.petalAngleC -= this.spinRate;
        this.petalAngleD -= this.spinRate;
        this.leafAngle -= this.spinRate;
    }

    /**
     * draws the flower
     */
    display() {
        //leaf
        push();
        strokeWeight(this.size.leaf);
        stroke(this.fill.leaf);
        const xL2 = this.x + sin(this.leafAngle) * this.lengthModifier.leaf;
        const yL2 = this.y + cos(this.leafAngle) * this.lengthModifier.leaf;
        line(this.x, this.y, xL2, yL2);
        pop();

        //petals
        push();
        strokeWeight(this.size.petal);
        stroke(this.fill.petal);

        const xA2 = this.x + sin(this.petalAngleA) * this.lengthModifier.petal;
        const yA2 = this.y + cos(this.petalAngleA) * this.lengthModifier.petal;
        line(this.x, this.y, xA2, yA2);

        const xB2 = this.x + sin(this.petalAngleB) * this.lengthModifier.petal;
        const yB2 = this.y + cos(this.petalAngleB) * this.lengthModifier.petal;
        line(this.x, this.y, xB2, yB2);

        const xC2 = this.x + sin(this.petalAngleC) * this.lengthModifier.petal;
        const yC2 = this.y + cos(this.petalAngleC) * this.lengthModifier.petal;
        line(this.x, this.y, xC2, yC2);

        const xD2 = this.x + sin(this.petalAngleD) * this.lengthModifier.petal;
        const yD2 = this.y + cos(this.petalAngleD) * this.lengthModifier.petal;
        line(this.x, this.y, xD2, yD2);
        pop();

        //center
        push();
        noStroke();
        fill(this.fill.center);
        ellipse(this.x, this.y, this.size.center);
        pop();
    }
}

let flower1;
let flower2;
let flower3;

const maxTimer = 3;
let startFlowerTimer = false;
let flowerTimer = maxTimer;
let startDispleasedTimer = false;
let displeasedTimer = maxTimer;

let countInSquareHole = 0;
let isDone = false;

/**
 * sets up the canvas
 */
function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
    initValues();
}

/**
 * initializes some values that depend on the canvas' size
 */
function initValues() {
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

    flower1 = new Flower(width/5, height/2, 0, 1.5707, 3.1415, 4.7123, 3.9269, 0.05);
    flower2 = new Flower(width/2.5, height/3, 0.7853, 2.3561, 3.9269, 5.4977, 4.7123, 0.065);
    flower3 = new Flower(4 * width/5, 2 * height/3, 0, 1.5707, 3.1415, 4.7123, 5.4977, 0.04);

    shapeHoleSpace.xMin = width/10;
    shapeHoleSpace.xMax = 9 * width/10;
    shapeHoleSpace.yMin = height/10;
    shapeHoleSpace.yMax = height/3;

    squareObject.moving.x = width/10;
    squareObject.moving.y = 9 * height/10;

    circleObject.moving.x = width/2;
    circleObject.moving.y = 9 * height/10;

    triangleObject.moving.xCenter = 9 * height/10;
    triangleObject.moving.yCenter = 9 * height/10;

    reloadBtn.x = width/2;
    reloadBtn.y = 9 * height/10;

    initShapeHoles();
}

/**
 * draws on the canvas
 */
function draw() {
    background(200);

    setClownLookWhere();
    drawHead();
    drawEye(clownBoy.eyes.left, clownBoy.isLookingLeft);
    drawEye(clownBoy.eyes.right, clownBoy.isLookingRight);
    drawMovingMouth();

    //holes
    drawSquare(true);
    drawCircle(true);
    drawTriangle(true);
    //shapes
    drawSquare(false);
    drawCircle(false);
    drawTriangle(false);

    isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;

    if (startFlowerTimer) {
        if (frameCount % 60 == 0 && flowerTimer > 0) {
            --flowerTimer;
        }

        if (flowerTimer == 0) {
            clownBoy.isHappy = false;
            flowerTimer = maxTimer;
            startFlowerTimer = false;
        }
    }

    if (clownBoy.isHappy) {
        flower1.rotate();
        flower1.display();

        flower2.rotate();
        flower2.display();

        flower3.rotate();
        flower3.display();
    }

    if (startDispleasedTimer) {
        if (frameCount % 60 == 0 && displeasedTimer > 0) {
            --displeasedTimer;
        }

        if (displeasedTimer == 0) {
            displeasedTimer = maxTimer;
            startDispleasedTimer = false;

            if (!triangleObject.moving.isMisplaced && !circleObject.moving.isMisplaced && !squareObject.moving.isDisappear) {
                clownBoy.isDispleased = false;
            }
        }
    }

    if (isDone) {
        if (countInSquareHole >= 2) {
            clownBoy.isHappy = false;
            clownBoy.isDispleased = true;
        }
        else if (countInSquareHole == 0) {
            clownBoy.isDispleased = false;
            clownBoy.isHappy = true;
        }
        else {
            clownBoy.isDispleased = false;
            clownBoy.isHappy = false;
        }

        drawResetBtn();
    }
}

/**
 * sets if eyes are looking up, and either left, right, or center
 */
function setClownLookWhere() {
    clownBoy.isLookingUp = mouseY < height/3;
    clownBoy.isLookingLeft = mouseX < width/3;
    clownBoy.isLookingRight = mouseX > 2 * width/3;

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
 * @param {boolean} lookingInDirection is either looking left or right, depending on the eye
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
    if (clownBoy.isDispleased && !clownBoy.isHappy) {
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
 * initializes each hole's center coordinates with a random value,
 * making sure none overlap
 */
function initShapeHoles() {
    squareObject.hole.x = random(shapeHoleSpace.xMin, shapeHoleSpace.xMax);
    squareObject.hole.y = random(shapeHoleSpace.yMin, shapeHoleSpace.yMax);

    for(;;) {
        circleObject.hole.x = random(shapeHoleSpace.xMin, shapeHoleSpace.xMax);
        circleObject.hole.y = random(shapeHoleSpace.yMin, shapeHoleSpace.yMax);

        let dx = abs(circleObject.hole.x - squareObject.hole.x);
        let dy = abs(circleObject.hole.y - squareObject.hole.y);

        if (dx > shapeHoleSpace.minDiff || dy > shapeHoleSpace.minDiff) {
            break;
        }
    }

    for(;;) {
        triangleObject.hole.xCenter = random(shapeHoleSpace.xMin, shapeHoleSpace.xMax);
        triangleObject.hole.yCenter = random(shapeHoleSpace.yMin, shapeHoleSpace.yMax);

        triangleObject.hole.x1 = triangleObject.hole.xCenter;
        triangleObject.hole.y1 = triangleObject.hole.yCenter - triangleObject.hole.distCenterPoint;

        triangleObject.hole.x2 = triangleObject.hole.xCenter - triangleObject.hole.distCenterPoint;
        triangleObject.hole.y2 = triangleObject.hole.yCenter + triangleObject.hole.distCenterPoint;

        triangleObject.hole.x3 = triangleObject.hole.xCenter + triangleObject.hole.distCenterPoint;
        triangleObject.hole.y3 = triangleObject.hole.yCenter + triangleObject.hole.distCenterPoint;

        let dSquarex = abs(triangleObject.hole.xCenter - squareObject.hole.x);
        let dSquarey = abs(triangleObject.hole.yCenter - squareObject.hole.y);
        let squareFarEnough = dSquarex > shapeHoleSpace.minDiff || dSquarey > shapeHoleSpace.minDiff;

        let isP1Overlap = isCirclePointClose(
            circleObject.hole.x,
            circleObject.hole.y,
            triangleObject.hole.x1,
            triangleObject.hole.y1,
            shapeHoleSpace.minDiff
        );

        let isP2Overlap = isCirclePointClose(
            circleObject.hole.x,
            circleObject.hole.y,
            triangleObject.hole.x2,
            triangleObject.hole.y2,
            shapeHoleSpace.minDiff
        );

        let isP3Overlap = isCirclePointClose(
            circleObject.hole.x,
            circleObject.hole.y,
            triangleObject.hole.x3,
            triangleObject.hole.y3,
            shapeHoleSpace.minDiff
        );

        let circleFarEnough = !isP1Overlap && !isP2Overlap && !isP3Overlap;

        if (squareFarEnough && circleFarEnough) {
            break;
        }
    }
}

/**
 * callback event when a mouse button gets pressed down
 * checks if the mouse pointer overlaps a shape in order to move it
 * @param {MouseEvent} evt 
 * @returns 
 */
function mousePressed(evt) {
    if (evt.button == 0) {
        if (isTrianglePointOverlap(triangleObject.moving, mouseX, mouseY) && !triangleObject.moving.isDisappear) {
            triangleObject.moving.isMoving = true;
            return;
        }
        
        if (
            isCirclePointClose(circleObject.moving.x, circleObject.moving.y, mouseX, mouseY, circleObject.moving.size/2)
            && !circleObject.moving.isDisappear
        ) {
            circleObject.moving.isMoving = true;
            return;
        }

        if (
            isRectPointOverlap(squareObject.moving, mouseX, mouseY, squareObject.moving.size, squareObject.moving.size) 
            && !squareObject.moving.isDisappear
        ) {
            squareObject.moving.isMoving = true;
            return;
        }
    }
}

/**
 * callback event when a mouse button gets released
 * checks if clicking the reload button at the end,
 * or if the shapes overlap holes, changing the clown's mood if a shape is over the right hole or not
 * @param {MouseEvent} evt 
 */
function mouseReleased(evt) {
    if (evt.button == 0 && isDone) {
        if (isRectPointOverlap(reloadBtn, mouseX, mouseY, reloadBtn.w, reloadBtn.h)) {
            location.reload();
        }
    }
    else if (evt.button == 0) {    
        if (triangleObject.moving.isMoving) {
            if (isTrianglePointOverlap(triangleObject.hole, mouseX, mouseY)) { 
                triangleObject.moving.isMisplaced = false;
                triangleObject.moving.isDisappear = true;
                isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;

                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (isRectPointOverlap(squareObject.hole, mouseX, mouseY, squareObject.hole.size, squareObject.hole.size)) {
                triangleObject.moving.isMisplaced = true;
                triangleObject.moving.isDisappear = true;
                isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;
                ++countInSquareHole;

                if (!isDone) {
                    startDispleasedTimer = true;
                }
            }
            else if (isCirclePointClose(circleObject.hole.x, circleObject.hole.y, mouseX, mouseY, circleObject.hole.size/2)) {
                triangleObject.moving.isMisplaced = true;
            }
            else {
                triangleObject.moving.isMisplaced = false;
            }

            triangleObject.moving.isMoving = false;
        }
        
        if (circleObject.moving.isMoving) {
            if (isCirclePointClose(circleObject.hole.x, circleObject.hole.y, mouseX, mouseY, circleObject.hole.size/2)) {
                circleObject.moving.isMisplaced = false;
                circleObject.moving.isDisappear = true;
                isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;
                
                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (isRectPointOverlap(squareObject.hole, mouseX, mouseY, squareObject.hole.size, squareObject.hole.size)) {
                circleObject.moving.isMisplaced = true;
                circleObject.moving.isDisappear = true;
                isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;
                ++countInSquareHole;

                if (!isDone) {
                    startDispleasedTimer = true;
                }
            }
            else if (isTrianglePointOverlap(triangleObject.hole, mouseX, mouseY)) {
                circleObject.moving.isMisplaced = true;
            }
            else {
                circleObject.moving.isMisplaced = false;
            }
            
            circleObject.moving.isMoving = false;
        }

        if (squareObject.moving.isMoving) {
            if (isRectPointOverlap(squareObject.hole, mouseX, mouseY, squareObject.hole.size, squareObject.hole.size)) {
                squareObject.moving.isMisplaced = false;
                squareObject.moving.isDisappear = true;
                isDone = squareObject.moving.isDisappear && circleObject.moving.isDisappear && triangleObject.moving.isDisappear;
                
                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (
                isTrianglePointOverlap(triangleObject.hole, mouseX, mouseY) 
                || isCirclePointClose(circleObject.hole.x, circleObject.hole.y, mouseX, mouseY, circleObject.hole.size/2)
            ) {
                squareObject.moving.isMisplaced = true;
            }
            else {
                squareObject.moving.isMisplaced = false;
            }    

            squareObject.moving.isMoving = false;
        }

        if (!isDone && (triangleObject.moving.isMisplaced || circleObject.moving.isMisplaced || squareObject.moving.isMisplaced)) {
            clownBoy.isDispleased = true;
        }
        else {
            clownBoy.isDispleased = false;
        }
    }
}

/**
 * returns if a point overlaps a specific triangle
 * @param {*} tri which triangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns
 */
function isTrianglePointOverlap(tri, xP, yP) {
    let triangleArea = getTriangleArea(
        tri.x1, tri.y1,
        tri.x2, tri.y2,
        tri.x3, tri.y3
    );

    let A1 = getTriangleArea(
        xP, yP,
        tri.x2, tri.y2,
        tri.x3, tri.y3
    );

    let A2 = getTriangleArea(
        tri.x1, tri.y1,
        xP, yP,
        tri.x3, tri.y3
    );

    let A3 = getTriangleArea(
        tri.x1, tri.y1,
        tri.x2, tri.y2,
        xP, yP,
    );

    return abs(A1 + A2 + A3 - triangleArea) < 0.001;
}

/**
 * returns the area of a triangle
 * @param {Number} x1 x coordinate of the first point
 * @param {Number} y1 y coordinate of the first point
 * @param {Number} x2 x coordinate of the second point
 * @param {Number} y2 y coordinate of the second point
 * @param {Number} x3 x coordinate of the third point
 * @param {Number} y3 y coordinate of the third point
 * @returns 
 */
function getTriangleArea(x1, y1, x2, y2, x3, y3) {
    return abs((
        x1 * (y2 - y3)
        + x2 * (y3 - y1)
        + x3 * (y1 - y2)
    ) / 2.0);
}

/**
 * returns if a point overlaps a specific circle
 * @param {Number} xCircle x coordinate of the circle
 * @param {Number} yCircle y coordinate of the circle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @param {Number} closeDist the distance past which the point is considered close
 * @returns 
 */
function isCirclePointClose(xCircle, yCircle, xP, yP, closeDist) {
    let d = dist(xCircle, yCircle, xP, yP);
    
    return d <= closeDist;
}

/**
 * returns if a point overlaps a specific rectangle
 * @param {*} rect which rectangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isRectPointOverlap(rect, xP, yP, w, h) {
    let xMin = rect.x - w/2;
    let xMax = rect.x + w/2;
    let yMin = rect.y - h/2;
    let yMax = rect.y + h/2;

    return (xP >= xMin && xP <= xMax && yP >= yMin && yP <= yMax);
}

/**
 * draws a square
 * @param {boolean} isHole if it's the square hole
 */
function drawSquare(isHole) {
    push();
    
    if (isHole) {    
        fill(0);
        noStroke();
        rect(squareObject.hole.x, squareObject.hole.y, squareObject.hole.size);
    }
    else {
        if (squareObject.moving.isMoving) {
            squareObject.moving.x = mouseX;
            squareObject.moving.y = mouseY;

            squareObject.moving.x = constrain(squareObject.moving.x, 0, width);
            squareObject.moving.y = constrain(squareObject.moving.y, 0, height);
        }
        else if (squareObject.moving.isDisappear) {
            squareObject.moving.size -= 1.75;
            squareObject.moving.size = constrain(squareObject.moving.size, 0, 72);
            squareObject.moving.fill.a -= 5;
            squareObject.moving.fill.a = constrain(squareObject.moving.fill.a, 0, 255);

            if (squareObject.moving.size == 0) {
                squareObject.moving.x = 0;
                squareObject.moving.y = 0;
                squareObject.moving.isMisplaced = false;
            }
        }

        fill(squareObject.moving.fill.r, squareObject.moving.fill.g, squareObject.moving.fill.b, squareObject.moving.fill.a);
        stroke(255, 255, 255, squareObject.moving.fill.a);
        rect(squareObject.moving.x, squareObject.moving.y, squareObject.moving.size);
    }

    pop();
}

/**
 * draws a circle
 * @param {boolean} isHole if it's the circle hole
 */
function drawCircle(isHole) {
    push();
    
    if (isHole) {
        fill(0);
        noStroke();
        ellipse(circleObject.hole.x, circleObject.hole.y, circleObject.hole.size);
    }
    else {
        if (circleObject.moving.isMoving) {
            circleObject.moving.x = mouseX;
            circleObject.moving.y = mouseY;

            circleObject.moving.x = constrain(circleObject.moving.x, 0, width);
            circleObject.moving.y = constrain(circleObject.moving.y, 0, height);
        }
        else if (circleObject.moving.isDisappear) {
            circleObject.moving.size -= 2;
            circleObject.moving.size = constrain(circleObject.moving.size, 0, 72);
            circleObject.moving.fill.a -= 5;
            circleObject.moving.fill.a = constrain(circleObject.moving.fill.a, 0, 255);

            if (circleObject.moving.size == 0) {
                circleObject.moving.x = 0;
                circleObject.moving.y = 0;
                circleObject.moving.isMisplaced = false;
            }
        }

        fill(circleObject.moving.fill.r, circleObject.moving.fill.g, circleObject.moving.fill.b, circleObject.moving.fill.a);
        stroke(255, 255, 255, circleObject.moving.fill.a);
        ellipse(circleObject.moving.x, circleObject.moving.y, circleObject.moving.size);
    }

    pop();
}

/**
 * draws a triangle
 * @param {boolean} isHole if it's the triangle hole
 */
function drawTriangle(isHole) {
    push();

    if (isHole) {
        fill(0);
        noStroke();
        triangle(
            triangleObject.hole.x1, triangleObject.hole.y1,
            triangleObject.hole.x2, triangleObject.hole.y2,
            triangleObject.hole.x3, triangleObject.hole.y3
        );
    }
    else {
        if (triangleObject.moving.isMoving) {
            triangleObject.moving.xCenter = mouseX;
            triangleObject.moving.yCenter = mouseY;

            triangleObject.moving.xCenter = constrain(triangleObject.moving.xCenter, 0, width);
            triangleObject.moving.yCenter = constrain(triangleObject.moving.yCenter, 0, height);
        }
        else if (triangleObject.moving.isDisappear) {
            triangleObject.moving.distCenterPoint -= 0.5;
            triangleObject.moving.distCenterPoint = constrain(triangleObject.moving.distCenterPoint, 0, 72);
            triangleObject.moving.fill.a -= 5;
            triangleObject.moving.fill.a = constrain(triangleObject.moving.fill.a, 0, 255);

            if (triangleObject.moving.distCenterPoint == 0) {
                triangleObject.moving.xCenter = 0;
                triangleObject.moving.yCenter = 0;
                triangleObject.moving.isMisplaced = false;
            }
        }

        triangleObject.moving.x1 = triangleObject.moving.xCenter;
        triangleObject.moving.y1 = triangleObject.moving.yCenter - triangleObject.moving.distCenterPoint;

        triangleObject.moving.x2 = triangleObject.moving.xCenter - triangleObject.moving.distCenterPoint;
        triangleObject.moving.y2 = triangleObject.moving.yCenter + triangleObject.moving.distCenterPoint;

        triangleObject.moving.x3 = triangleObject.moving.xCenter + triangleObject.moving.distCenterPoint;
        triangleObject.moving.y3 = triangleObject.moving.yCenter + triangleObject.moving.distCenterPoint;

        fill(triangleObject.moving.fill.r, triangleObject.moving.fill.g, triangleObject.moving.fill.b, triangleObject.moving.fill.a);
        stroke(255, 255, 255, triangleObject.moving.fill.a);
        triangle(
            triangleObject.moving.x1, triangleObject.moving.y1,
            triangleObject.moving.x2, triangleObject.moving.y2,
            triangleObject.moving.x3, triangleObject.moving.y3
        );
    }

    pop();
}

/**
 * draws the reset button
 */
function drawResetBtn() {
    let isHover = isRectPointOverlap(reloadBtn, mouseX, mouseY, reloadBtn.w, reloadBtn.h);
    let btnTxt = "Yippee!!";

    if (isHover) {
        cursor(HAND);
    }
    else {
        cursor(ARROW);
    }

    if (countInSquareHole == 1) {
        btnTxt = "¯\\_( :/ )_/¯";
    }
    else if (countInSquareHole == 2) {
        btnTxt = "why";
    }

    push();
    fill(isHover ? reloadBtn.fill.hover : reloadBtn.fill.base);
    stroke(reloadBtn.stroke);
    strokeWeight(7.5);
    rect(reloadBtn.x, reloadBtn.y, reloadBtn.w, reloadBtn.h);
    pop();

    push();
    textAlign(CENTER, CENTER);
    fill(reloadBtn.stroke);
    stroke(reloadBtn.stroke);
    strokeWeight(1.5);
    textSize(reloadBtn.txtSize);
    text(btnTxt, reloadBtn.x, reloadBtn.y);
    pop();
}