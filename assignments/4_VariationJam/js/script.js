/**
 * Minot-art attack
 * Marjorie Dudemaine
 * 
 * Different variations of a maze game where the tiles
 * change color when they get visited
 */

"use strict";

// The different colors used by entities
const entityColors = [
    { // Red
        entity: {
            h: 12,
            s: 255,
            b: 255,
        },
        trail: {
            h: 15,
            s: 175,
            b: 245,
        },
        outline: 255
    },
    { // Yellow
        entity: {
            h: 50,
            s: 255,
            b: 225,
        },
        trail: {
            h: 53,
            s: 175,
            b: 245,
        },
        outline: 0
    },
    { // Green
        entity: {
            h: 110,
            s: 255,
            b: 225,
        },
        trail: {
            h: 105,
            s: 175,
            b: 245,
        },
        outline: 0
    },
    { // Blue
        entity: {
            h: 220,
            s: 255,
            b: 255,
        },
        trail: {
            h: 223,
            s: 175,
            b: 245,
        },
        outline: 255
    },
    { // Dark Gray
        h: 0,
        s: 0,
        b: 75,
        outline: 255
    },
    { // Light Gray
        h: 0,
        s: 0,
        b: 150,
        outline: 0
    }
];

// The player 1 entity
// Has a position, the indexes of the current overlapping tile, a size, and color values
const player1 = {
    x: undefined,
    y: undefined,
    iRow: undefined,
    jCol: undefined,
    size: undefined,
    colorFill: undefined
};

// The player 2 entity
// Has a position, the indexes of the current overlapping tile, a size, and color values
const player2 = {
    x: undefined,
    y: undefined,
    iRow: undefined,
    jCol: undefined,
    size: undefined,
    colorFill: undefined
};

// TODO add menu screen to select 1 or 2 players 
// Whether the player 2 entity is a CPU or an actual person
let playAgainstCPU = true;

// The CPU entity's timer
const cpuTimer = {
    lastMoveFrameCount: 0,
    frameCountMod: 45,
    isMoving: false
};

// The object in which the mazes' data gets loaded
let mazeData;

// The current maze in action
let maze;

// The manager for changing the tiles' colors
let colorManager = new ColorManagerFill();

/**
 * Preloads various assets before the canvas gets initialized
 */
function preload() {
    mazeData = loadJSON("data/mazes.json");
}

/**
 * Initializes the canvas
*/
function setup() {
    createCanvas(840, 840);
    colorMode(HSB,360,255,255);
    initMaze();
}

/**
 * Initializes a random maze
 */
function initMaze() {
    maze = random(mazeData.dark_mazes);
    player1.size = maze.tileSize - 10;
    player2.size = maze.tileSize - 10;

    let colorIDs = [0,1,2,3];
    let selectedID;

    for (let iRow = 0; iRow < maze.tiles.length; ++iRow) {
        for (let jCol = 0; jCol < maze.tiles[iRow].length; ++jCol) {
            if (maze.tiles[iRow][jCol].type === MazeTileMap.PLAYER_1_SPAWN) {
                // Stores the indexes of the tile player 1 starts on
                player1.iRow = iRow;
                player1.x = jCol * maze.tileSize + maze.tileSize/2;

                player1.jCol = jCol;
                player1.y = iRow * maze.tileSize + maze.tileSize/2;

                // Randomize the color of player 1
                selectedID = random(colorIDs);
                colorIDs = colorIDs.filter(c => c !== selectedID);
                player1.colorFill = entityColors[selectedID];
                // Fix the starting tile's color
                maze.tiles[iRow][jCol].h = entityColors[selectedID].trail.h;
                maze.tiles[iRow][jCol].s = entityColors[selectedID].trail.s;
                maze.tiles[iRow][jCol].b = entityColors[selectedID].trail.b;
            }

            if (maze.tiles[iRow][jCol].type === MazeTileMap.PLAYER_2_SPAWN) {
                // Stores the indexes of the tile the player 2 entity starts on
                player2.iRow = iRow;
                player2.x = jCol * maze.tileSize + maze.tileSize/2;

                player2.jCol = jCol;
                player2.y = iRow * maze.tileSize + maze.tileSize/2;

                // Randomize the color of the player 2 entity
                selectedID = random(colorIDs);
                colorIDs = colorIDs.filter(c => c !== selectedID);
                player2.colorFill = entityColors[selectedID];
                // Fix the starting tile's color
                maze.tiles[iRow][jCol].h = entityColors[selectedID].trail.h;
                maze.tiles[iRow][jCol].s = entityColors[selectedID].trail.s;
                maze.tiles[iRow][jCol].b = entityColors[selectedID].trail.b;
            }

            if (player1.iRow !== undefined && player1.jCol !== undefined && player2.iRow !== undefined && player2.jCol !== undefined) {
                break;
            }
        }

        if (player1.iRow !== undefined && player1.jCol !== undefined && player2.iRow !== undefined && player2.jCol !== undefined) {
            break;
        }
    }
}

/**
 * Draws on the canvas
*/
function draw() {
    drawMaze();

    if (playAgainstCPU) {
        moveCPU();
        // TODO check overlap with player 1
    }
    
    drawPlayer2();
    drawPlayer1();
}

/**
 * Draws each of the current maze's tiles
 */
function drawMaze() {
    for (let iRow = 0; iRow < maze.tiles.length; ++iRow) {
        for (let jCol = 0; jCol < maze.tiles[iRow].length; ++jCol) {
            push();
            noStroke();
            fill(maze.tiles[iRow][jCol].h, maze.tiles[iRow][jCol].s, maze.tiles[iRow][jCol].b);
            rect(jCol * maze.tileSize, iRow * maze.tileSize, maze.tileSize);
            pop();
        }
    }
}

/**
 * Moves the CPU entity in a random, valid position on a timer
 */
function moveCPU() {
    if (!cpuTimer.isMoving && (frameCount - cpuTimer.lastMoveFrameCount) % cpuTimer.frameCountMod === 0) {
        //TODO slightly better logic, prioritize tiles that aren't its trail
        cpuTimer.isMoving = true;
        const possibleMoves = [];

        // Horizontal adjacent tiles check for walls
        for (let i = 0; i < 2; ++i) {
            if (maze.tiles[player2.iRow + (-1) ** i][player2.jCol].type !== MazeTileMap.WALL) {
                possibleMoves.push({iIncr: (-1) ** i, jIncr: 0});
            }
        }
    
        // Vertical adjacent tiles check for walls
        for (let j = 0; j < 2; ++j) {
            if (maze.tiles[player2.iRow][player2.jCol + (-1) ** j].type !== MazeTileMap.WALL) {
                possibleMoves.push({iIncr: 0, jIncr: (-1) ** j});
            }
        }
    
        const move = random(possibleMoves);
    
        // Adjust the CPU's position and overlapping tiles
        if (move.iIncr > 0) {
            player2.y += maze.tileSize;
            player2.iRow = floor(player2.y / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
        }
        else if (move.iIncr < 0) {
            player2.y -= maze.tileSize;
            player2.iRow = floor(player2.y / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
        }
        else if (move.jIncr > 0) {
            player2.x += maze.tileSize;
            player2.jCol = floor(player2.x / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
        }
        else if (move.jIncr < 0) {
            player2.x -= maze.tileSize;
            player2.jCol = floor(player2.x / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
        }

        cpuTimer.lastMoveFrameCount = frameCount;
        cpuTimer.isMoving = false;
    }
}

/**
 * Draws the player 1 entity
 */
function drawPlayer1() {
    push();
    rectMode(CENTER);
    fill(player1.colorFill.entity.h, player1.colorFill.entity.s, player1.colorFill.entity.b);
    stroke(0,0,player1.colorFill.outline);
    rect(player1.x, player1.y, player1.size);
    pop();
}

/**
 * Draws the player 2 entity
 */
function drawPlayer2() {
    push();
    rectMode(CENTER);
    fill(player2.colorFill.entity.h, player2.colorFill.entity.s, player2.colorFill.entity.b);
    stroke(0,0,player2.colorFill.outline);
    rect(player2.x, player2.y, player2.size);
    pop();
}

/**
 * Checks whether a player overlaps the other and manages the outcome
 * @param {boolean} isPlayer1Init If player 1 is the one initiating the check
 */
function checkPlayerOverlap(isPlayer1Init) {
    // TODO
}

/**
 * Event for when a key gets pressed on the keyboard
 * Manages the players' movement
 */
function keyPressed() {
    if (keyIsDown(UP_ARROW) && maze.tiles[player1.iRow - 1][player1.jCol].type !== 1) {
        player1.y -= maze.tileSize;
        player1.iRow = floor(player1.y / maze.tileSize);
        colorManager.changeTileColor(player1.iRow, player1.jCol, true);
        // TODO check overlap with player 2
    }
    
    if (keyIsDown(DOWN_ARROW) && maze.tiles[player1.iRow + 1][player1.jCol].type !== 1) {
        player1.y += maze.tileSize;
        player1.iRow = floor(player1.y / maze.tileSize);
        colorManager.changeTileColor(player1.iRow, player1.jCol, true);
        // TODO check overlap with player 2
    }
    
    if (keyIsDown(LEFT_ARROW) && maze.tiles[player1.iRow][player1.jCol - 1].type !== 1) {
        player1.x -= maze.tileSize;
        player1.jCol = floor(player1.x / maze.tileSize);
        colorManager.changeTileColor(player1.iRow, player1.jCol, true);
        // TODO check overlap with player 2
    }
    
    if (keyIsDown(RIGHT_ARROW) && maze.tiles[player1.iRow][player1.jCol + 1].type !== 1) {
        player1.x += maze.tileSize;
        player1.jCol = floor(player1.x / maze.tileSize);
        colorManager.changeTileColor(player1.iRow, player1.jCol, true);
        // TODO check overlap with player 2
    }

    if (!playAgainstCPU) {
        if (keyIsDown(87) && maze.tiles[player2.iRow - 1][player2.jCol].type !== 1) {
            // W key
            player2.y -= maze.tileSize;
            player2.iRow = floor(player2.y / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
            // TODO check overlap with player 1
        }
        
        if (keyIsDown(83) && maze.tiles[player2.iRow + 1][player2.jCol].type !== 1) {
            // S key
            player2.y += maze.tileSize;
            player2.iRow = floor(player2.y / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
            // TODO check overlap with player 1
        }
        
        if (keyIsDown(65) && maze.tiles[player2.iRow][player2.jCol - 1].type !== 1) {
            // A key
            player2.x -= maze.tileSize;
            player2.jCol = floor(player2.x / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
            // TODO check overlap with player 1
        }
        
        if (keyIsDown(68) && maze.tiles[player2.iRow][player2.jCol + 1].type !== 1) {
            // D key
            player2.x += maze.tileSize;
            player2.jCol = floor(player2.x / maze.tileSize);
            colorManager.changeTileColor(player2.iRow, player2.jCol, false);
            // TODO check overlap with player 1
        }
    }
}