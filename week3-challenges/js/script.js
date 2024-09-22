/**
 * Circle Master (edit)
 * Marjorie Dudemaine
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const puck = {
    x: 350,
    y: 350,
    size: 100,
    fill: "#ff0000"
  };
  
  const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
  };

const target = {
    x: 200,
    y: 200,
    size: 75,
    fill: 250,
};
  
  /**
   * Create the canvas
   */
  function setup() {
    createCanvas(400, 400);
  }
  
  /**
   * Move the user circle, check for overlap, draw the two circles
   */
  function draw() {
    background("#aaaaaa");
    
    // Move user circle
    moveUser();

    // potentially move the target
    moveTarget();

    // check puck/target overlap
    checkPuck();
    
    // Draw the user and puck and target
    drawUser();
    drawPuck();
    drawTarget();
  }
  
  /**
   * Sets the user position to the mouse position
   */
  function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
  }
  
  /**
   * Displays the user circle
   */
  function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
  }
  
  /**
   * Displays the puck circle
   */
  function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
  }
  
  /**
   * Challenge 1: Move the target
   * => check for overlap
   * => if overlap, move away from the shortest distance (x or y)
   */
  function moveTarget() {
    let distance = dist(user.x, user.y, target.x, target.y);
    let isOverlap = distance - user.size/2 < target.size/2;

    if (isOverlap) {
        let distX = target.x - user.x
        let distY = target.y - user.y;

        if (abs(distX) < abs(distY)) {
            target.x += distX > 0 ? 1 : -1;
        }
        else if (abs(distY) < abs(distX)) {
            target.y += distY > 0 ? 1 : -1;
        }
        else {
            target.x += distX > 0 ? 1 : -1;
            target.y += distY > 0 ? 1 : -1;
        }

        target.x = constrain(target.x, 40, 360);
        target.y = constrain(target.y, 40, 360);
    }
  }

  /**
   * Challenge 2: Draw the target
   */
  function drawTarget() {
    push();
    noStroke();
    fill(target.fill);
    ellipse(target.x, target.y, target.size);
    pop();
  }

  /**
   * Challenge 3: Change target background if overlap with puck
   */
  function checkPuck() {
    let distance = dist(puck.x, puck.y, target.x, target.y);
    let isOverlap = distance - puck.size/2 < target.size/2;

    if (isOverlap) {
        target.fill = "#f59dbd";
    }  
    else {
        target.fill = 250;
    }
  }