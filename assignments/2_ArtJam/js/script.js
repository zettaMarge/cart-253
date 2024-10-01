/**
 * A Sneak Peak at the Show
 * Marjorie Dudemaine
 * 
 * A simple game of Match The Shapes, featuring my adorable baby boy clown :)
 * Somewhat inspired by that one Tiktok where every object fits in the square hole.
 */

"use strict";


/**
 * abstract class for the shapes
 */
class ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     * @param {Number} r red value
     * @param {Number} g green value
     * @param {Number} b blue value
     * @param {Number} a alpha/transparency value
     */
    constructor(x, y, size, r, g, b, a) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = {
            r: r,
            g: g,
            b: b,
            a: a
        };
    }

    /**
     * draws the shape
     */
    display() {
        throw new Error("Method 'display()' must be implemented.");
    }
}

/**
 * triangle shape that can be moved
 */
class TriangleShape extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     * @param {Number} r red value
     * @param {Number} g green value
     * @param {Number} b blue value
     * @param {Number} a alpha/transparency value 
     */
    constructor(x, y, size, r, g, b, a) {
        super(x, y, size, r, g, b, a);
    }

    isDisappear = false;
    isMoving = false;
    isMisplaced = false;

    /**
     * draws the triangle
     */
    display() {
        if (this.isMoving) {
            this.x = constrain(mouseX, 0, width);
            this.y = constrain(mouseY, 0, height);
        }
        else if (this.isDisappear) {
            this.size = constrain(this.size - 0.5, 0, 72);
            this.fill.a -= 5;
            this.fill.a = constrain(this.fill.a, 0, 255);

            if (this.size == 0) {
                this.x = 0;
                this.y = 0;
                this.isMisplaced = false;
            }
        }

        push();
        let x1 = this.x;
        let y1 = this.y - this.size;

        let x2 = this.x - this.size;
        let y2 = this.y + this.size;

        let x3 = this.x + this.size;
        let y3 = this.y + this.size;

        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        stroke(255, 255, 255, this.fill.a);
        triangle(
            x1, y1,
            x2, y2,
            x3, y3
        );
        pop();
    }
}

/**
 * triangle hole into which riangles can be placed
 */
class TriangleHole extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     */
    constructor(x, y, size) {
        super(x, y, size, 0, 0, 0, 255);
    }

    /**
     * draws the triangle hole
     */
    display() {
        let x1 = this.x;
        let y1 = this.y - this.size;

        let x2 = this.x - this.size;
        let y2 = this.y + this.size;

        let x3 = this.x + this.size;
        let y3 = this.y + this.size;

        push();
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        noStroke();
        triangle(
            x1, y1,
            x2, y2,
            x3, y3
        );
        pop();
    }
}

/**
 * circle shape that can be moved
 */
class CircleShape extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     * @param {Number} r red value
     * @param {Number} g green value
     * @param {Number} b blue value
     * @param {Number} a alpha/transparency value
     */
    constructor(x, y, size, r, g, b, a) {
        super(x, y, size, r, g, b, a);
    }

    isDisappear = false;
    isMoving = false;
    isMisplaced = false;

    /**
     * draws the circle
     */
    display() {
        push();
        if (this.isMoving) {
            this.x = mouseX;
            this.y = mouseY;

            this.x = constrain(this.x, 0, width);
            this.y = constrain(this.y, 0, height);
        }
        else if (this.isDisappear) {
            this.size = constrain(this.size - 2, 0, 72);
            this.fill.a = constrain(this.fill.a - 5, 0, 255);

            if (this.size == 0) {
                this.x = 0;
                this.y = 0;
                this.isMisplaced = false;
            }
        }

        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        stroke(255, 255, 255, this.fill.a);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}

/**
 * circle hole into which circles can be placed
 */
class CircleHole extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     */
    constructor(x, y, size) {
        super(x, y, size, 0, 0, 0, 255);
    }

    /**
     * draws the circle hole
     */
    display() {
        push();
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        noStroke();
        ellipse(this.x, this.y, this.size);
        pop();
    }
}

/**
 * square shape that can be moved
 */
class SquareShape extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     * @param {Number} r red value
     * @param {Number} g green value
     * @param {Number} b blue value
     * @param {Number} a alpha/transparency value
     */
    constructor(x, y, size, r, g, b, a) {
        super(x, y, size, r, g, b, a);
    }

    isDisappear = false;
    isMoving = false;
    isMisplaced = false;

    /**
     * draws the square
     */
    display() {
        if (this.isMoving) {
            this.x = mouseX;
            this.y = mouseY;

            this.x = constrain(this.x, 0, width);
            this.y = constrain(this.y, 0, height);
        }
        else if (this.isDisappear) {
            this.size -= 1.75;
            this.size = constrain(this.size, 0, 72);
            this.fill.a -= 5;
            this.fill.a = constrain(this.fill.a, 0, 255);

            if (this.size == 0) {
                this.x = 0;
                this.y = 0;
                this.isMisplaced = false;
            }
        }
        
        push();
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        stroke(255, 255, 255, this.fill.a);
        rect(this.x, this.y, this.size);
        pop();
    }
}

/**
 * square hole into which shapes can be placed
 */
class SquareHole extends ShapeBase {
    /**
     * constructor
     * @param {Number} x x coordinate of center
     * @param {Number} y y coordinate of center
     * @param {Number} size size of the shape
     */
    constructor(x, y, size) {
        super(x, y, size, 0, 0, 0, 255);
    }

    /**
     * draws the square hole
     */
    display() {
        push();
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        noStroke();
        rect(this.x, this.y, this.size);
        pop();
    }
}

/**
 * class for the flowers
 */
class Flower {
    /**
     * 
     * @param {Number} x x coordinate of the center
     * @param {Number} y y coordinate of the center
     * @param {Number} petalAngleA petal angle A from the center
     * @param {Number} petalAngleB petal angle B from the center
     * @param {Number} petalAngleC petal angle C from the center
     * @param {Number} petalAngleD petal angle D from the center
     * @param {Number} leafAngle leaf angle from the center
     * @param {Number} spinRate how fast the flower spins
     */
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

let pinkTriangle;
let triangleHole;

let orangeCircle;
let circleHole;

let greenSquare;
let squareHole;

let flower1;
let flower2;
let flower3;

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

    pinkTriangle = new TriangleShape(9 * height/10, 9 * height/10, 35, 247, 141, 172, 255);
    orangeCircle = new CircleShape(width/2, 9 * height/10, 77, 245, 164, 93, 255)
    greenSquare = new SquareShape(width/10, 9 * height/10, 75, 117, 209, 128, 255);

    reloadBtn.x = width/2;
    reloadBtn.y = 9 * height/10;

    initShapeHoles();
}

/**
 * initializes each hole's center coordinates with a random value,
 * making sure none overlap
 */
function initShapeHoles() {
    squareHole = new SquareHole(
        random(shapeHoleSpace.xMin, shapeHoleSpace.xMax),
        random(shapeHoleSpace.yMin, shapeHoleSpace.yMax),
        80
    );

    for(;;) {
        let xC = random(shapeHoleSpace.xMin, shapeHoleSpace.xMax);
        let yC = random(shapeHoleSpace.yMin, shapeHoleSpace.yMax);

        let dx = abs(xC - squareHole.x);
        let dy = abs(yC - squareHole.y);

        if (dx > shapeHoleSpace.minDiff || dy > shapeHoleSpace.minDiff) {
            circleHole = new CircleHole(xC, yC, 80);
            break;
        }
    }

    for(;;) {
        let size = 37;
        let xT = random(shapeHoleSpace.xMin, shapeHoleSpace.xMax);
        let yT = random(shapeHoleSpace.yMin, shapeHoleSpace.yMax);

        let x1 = xT;
        let y1 = yT - size;

        let x2 = xT - size;
        let y2 = yT + size;

        let x3 = xT + size;
        let y3 = yT + size;

        let dSquarex = abs(xT - squareHole.x);
        let dSquarey = abs(yT - squareHole.y);
        let squareFarEnough = dSquarex > shapeHoleSpace.minDiff || dSquarey > shapeHoleSpace.minDiff;

        let isP1Overlap = isCirclePointClose(
            circleHole.x,
            circleHole.y,
            x1,
            y1,
            shapeHoleSpace.minDiff
        );

        let isP2Overlap = isCirclePointClose(
            circleHole.x,
            circleHole.y,
            x2,
            y2,
            shapeHoleSpace.minDiff
        );

        let isP3Overlap = isCirclePointClose(
            circleHole.x,
            circleHole.y,
            x3,
            y3,
            shapeHoleSpace.minDiff
        );

        let circleFarEnough = !isP1Overlap && !isP2Overlap && !isP3Overlap;

        if (squareFarEnough && circleFarEnough) {
            triangleHole = new TriangleHole(xT, yT, size);
            break;
        }
    }
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
    squareHole.display();
    circleHole.display();
    triangleHole.display();
    //shapes
    greenSquare.display();
    orangeCircle.display();
    pinkTriangle.display();

    isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;

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

            //a shape could still be misplaced at the end of the timer, then we want to frown still
            if (!pinkTriangle.isMisplaced && !orangeCircle.isMisplaced && !greenSquare.isDisappear) {
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

        drawReloadBtn();
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
 * callback event when a mouse button gets pressed down
 * checks if the mouse pointer overlaps a shape in order to move it
 * @param {MouseEvent} evt 
 * @returns 
 */
function mousePressed(evt) {
    if (evt.button == 0) {
        if (isTrianglePointOverlap(pinkTriangle.x, pinkTriangle.y, pinkTriangle.size, mouseX, mouseY) && !pinkTriangle.isDisappear) {
            pinkTriangle.isMoving = true;
            return;
        }
        
        if (isCirclePointClose(orangeCircle.x, orangeCircle.y, mouseX, mouseY, orangeCircle.size/2) && !orangeCircle.isDisappear) {
            orangeCircle.isMoving = true;
            return;
        }

        if (isRectPointOverlap(greenSquare.x, greenSquare.y, mouseX, mouseY, greenSquare.size, greenSquare.size) && !greenSquare.isDisappear) {
            greenSquare.isMoving = true;
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
        if (isRectPointOverlap(reloadBtn.x, reloadBtn.y, mouseX, mouseY, reloadBtn.w, reloadBtn.h)) {
            location.reload();
        }
    }
    else if (evt.button == 0) {    
        if (pinkTriangle.isMoving) {
            if (isTrianglePointOverlap(triangleHole.x, triangleHole.y, triangleHole.size, mouseX, mouseY)) { 
                pinkTriangle.isMisplaced = false;
                pinkTriangle.isDisappear = true;
                isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;

                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (isRectPointOverlap(squareHole.x, squareHole.y, mouseX, mouseY, squareHole.size, squareHole.size)) {
                pinkTriangle.isMisplaced = true;
                pinkTriangle.isDisappear = true;
                isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;
                ++countInSquareHole;

                if (!isDone) {
                    startDispleasedTimer = true;
                }
            }
            else if (isCirclePointClose(circleHole.x, circleHole.y, mouseX, mouseY, circleHole.size/2)) {
                pinkTriangle.isMisplaced = true;
            }
            else {
                pinkTriangle.isMisplaced = false;
            }

            pinkTriangle.isMoving = false;
        }
        
        if (orangeCircle.isMoving) {
            if (isCirclePointClose(circleHole.x, circleHole.y, mouseX, mouseY, circleHole.size/2)) {
                orangeCircle.isMisplaced = false;
                orangeCircle.isDisappear = true;
                isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;
                
                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (isRectPointOverlap(squareHole.x, squareHole.y, mouseX, mouseY, squareHole.size, squareHole.size)) {
                orangeCircle.isMisplaced = true;
                orangeCircle.isDisappear = true;
                isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;
                ++countInSquareHole;

                if (!isDone) {
                    startDispleasedTimer = true;
                }
            }
            else if (isTrianglePointOverlap(triangleHole.x, triangleHole.y, triangleHole.size, mouseX, mouseY)) {
                orangeCircle.isMisplaced = true;
            }
            else {
                orangeCircle.isMisplaced = false;
            }
            
            orangeCircle.isMoving = false;
        }

        if (greenSquare.isMoving) {
            if (isRectPointOverlap(squareHole.x, squareHole.y, mouseX, mouseY, squareHole.size, squareHole.size)) {
                greenSquare.isMisplaced = false;
                greenSquare.isDisappear = true;
                isDone = greenSquare.isDisappear && orangeCircle.isDisappear && pinkTriangle.isDisappear;
                
                if (!isDone) {
                    clownBoy.isHappy = true;
                    startFlowerTimer = true;
                    flowerTimer = maxTimer;
                }
            }
            else if (
                isTrianglePointOverlap(triangleHole.x, triangleHole.y, triangleHole.size, mouseX, mouseY) 
                || isCirclePointClose(circleHole.x, circleHole.y, mouseX, mouseY, circleHole.size/2)
            ) {
                greenSquare.isMisplaced = true;
            }
            else {
                greenSquare.isMisplaced = false;
            }    

            greenSquare.isMoving = false;
        }

        if (!isDone && (pinkTriangle.isMisplaced || orangeCircle.isMisplaced || greenSquare.isMisplaced)) {
            clownBoy.isDispleased = true;
        }
        else {
            clownBoy.isDispleased = false;
        }
    }
}

/**
 * returns if a point overlaps a triangle
 * @param {Number} xT x coordinate of the triangle center
 * @param {Number} yT y coordinate of the triangle center
 * @param {Number} sizeT size of the triangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isTrianglePointOverlap(xT, yT, sizeT, xP, yP) {
    let x1 = xT;
    let y1 = yT - sizeT;

    let x2 = xT - sizeT;
    let y2 = yT + sizeT;

    let x3 = xT + sizeT;
    let y3 = yT + sizeT;

    let triangleArea = getTriangleArea(
        x1, y1,
        x2, y2,
        x3, y3
    );

    let A1 = getTriangleArea(
        xP, yP,
        x2, y2,
        x3, y3
    );

    let A2 = getTriangleArea(
        x1, y1,
        xP, yP,
        x3, y3
    );

    let A3 = getTriangleArea(
        x1, y1,
        x2, y2,
        xP, yP,
    );

    //if the point is in the triangle, then the difference between the sum of the sub-areas and the total area
    //should be close to 0. considering we're dealing with float values, == might not work
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
 * returns if a point overlaps a circle
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
 * returns if a point overlaps a rectangle
 * @param {Number} xR x coordinate of the rectangle
 * @param {Number} yR y coordinate of the rectangle
 * @param {Number} xP x coordinate of the point
 * @param {Number} yP y coordinate of the point
 * @returns 
 */
function isRectPointOverlap(xR, yR, xP, yP, w, h) {  
    let xMin = xR - w/2;
    let xMax = xR + w/2;
    let yMin = yR - h/2;
    let yMax = yR + h/2;

    return (xP >= xMin && xP <= xMax && yP >= yMin && yP <= yMax);
}

/**
 * draws the reset button
 */
function drawReloadBtn() {
    let isHover = isRectPointOverlap(reloadBtn.x, reloadBtn.y, mouseX, mouseY, reloadBtn.w, reloadBtn.h);
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