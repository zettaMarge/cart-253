/**
 * Luigi's Mansion Low% 
 * Marjorie Dudemaine
 * 
 * A representation of the result of getting the lowest threshold of
 * money in Luigi's Mansion (2001) on a canvas using the p5 tool
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(640, 480);
}

/**
 * Draws the whole picture on the canvas
 */
function draw() {
	drawSky();
	drawCloud();
	drawGround();
	drawMansion();
	drawGate();
}

/**
 * Draws the sky (nice and blue)
 */
function drawSky() {
	background(150, 200, 250);
}

/**
 * Draws a fluffy white cloud
 */
function drawCloud() {
	push();
	noStroke();
	fill(255);
	ellipse(100, 100, 100, 100);
	ellipse(180, 80, 100, 100);
	ellipse(160, 120, 60, 60);
	ellipse(190, 130, 60, 60);
	ellipse(220, 120, 60, 60);
	pop();
}

/**
 * Draws the nice, lush yard, with a path leading to the mansion
 */
function drawGround() {
	// The ground
	push();
	noStroke();
	fill(81, 176, 94);
	rect(0, 300, 640, 480);
	pop();

	// the front path
	push();
	noStroke();
	fill(196, 219, 94);
	rect(275, 380, 90, 480);
	pop();

	// the back path
	push();
	noStroke();
	fill(196, 219, 94);
	triangle(275, 380, 320, 300, 365, 380);
	pop();
}

/**
 * Draws the Low% mansion
 * spoilers: it's a tent
 */
function drawMansion() {
	drawBody();
	drawRoof();
	drawWindow();
	drawDoor();
}

/**
 * Draws the main body of the mansion
 */
function drawBody() {
	push();
	noStroke();
	fill(48, 128, 52);
	rect(220, 200, 240, 140);
	pop();
}

/**
 * Draws the roof of the mansion
 */
function drawRoof() {
	push();
	noStroke();
	fill("#308034");
	triangle(220, 200, 340, 120, 460, 200);
	pop();
}

/**
 * Draws a window on the mansion
 */
function drawWindow() {
    //the frame
	push();
	stroke("dimgray");
	strokeWeight(5);
	fill(182, 211, 240);
	rect(360, 230, 60, 60);
	pop();

    //the crosshairs
    push();
    stroke("dimgray");
    strokeWeight(5);
    fill("dimgray");
    rect(389, 230, 2, 60);
    rect(359, 260, 60, 2);
    pop();
}

/**
 * Draws the mansion's door
 */
function drawDoor() {
	push();
	noStroke();
	fill("#474747");
	triangle(300, 340, 320, 240, 340, 340);
	pop();
}

/** 
 * draws the gate in fron of the mansion
*/
function drawGate() {
	push();
	noStroke();
	fill("#7e857f");
	//left side
	rect(0, 330, 240, 115);
	rect(190, 280, 50, 60);
	//right side
	rect(400, 330, 240, 115);
	rect(400, 280, 50, 60);
	pop();
}