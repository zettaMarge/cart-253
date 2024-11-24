/**
 * Minot-Art attack
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

// Whether the menu is shown or not
let isOnMenu = true;

// Which variation will be launched
let selectedVariation = GameVariation.FILL;

// Variable to randomize the selection's highlight color
let selectedVariationColorCounter = 0;

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
}

/**
 * Draws on the canvas
*/
function draw() {
    if (isOnMenu) {
        // A black rectangle to "reset" what's on the canvas
        push();
        fill(0);
        noStroke();
        rect(0, 0, width, height);
        pop();

        drawVariationSelection();
        drawGameInstructions();
    }
    else {
        drawMaze();
        let player2Name = 2;

        if (playAgainstCPU) {
            player2Name = "CPU";
            moveCPU();
            // TODO check overlap with player 1
        }
        
        drawPlayer(player2, player2Name);
        drawPlayer(player1, 1);
    }
}

/**
 * Writes the game's variations and highlights the currently selected one
 */
function drawVariationSelection() {
    for (let v of GameVariation.TO_LIST) {
        push();
        textFont('Courier New');
        textAlign(CENTER, CENTER);
        strokeWeight(1.5);
        textSize(36);

        if (v === GameVariation.COLORBLIND) {
            // COLORBLIND uses gray as a selection highlight
            if (selectedVariation === GameVariation.COLORBLIND) {
                fill(entityColors[5].h, entityColors[5].s, entityColors[5].b);
                stroke(entityColors[4].h, entityColors[4].s, entityColors[4].b);
            }
            else {
                fill(255);
                stroke(255);
            }           
            text(GameVariation.COLORBLIND, 667, 300);
        }
        else {
            // FILL and BLEND both use a random color as a selection highlight
            push();
            textFont('Courier New');
            textAlign(CENTER, CENTER);

            if (selectedVariation === v) {
                fill(
                    entityColors[selectedVariationColorCounter].trail.h,
                    entityColors[selectedVariationColorCounter].trail.s,
                    entityColors[selectedVariationColorCounter].trail.b
                );
                stroke(
                    entityColors[selectedVariationColorCounter].entity.h, 
                    entityColors[selectedVariationColorCounter].entity.s, 
                    entityColors[selectedVariationColorCounter].entity.b
                );
            }
            else {
                fill(255);
                stroke(255);
            }

            if (v === GameVariation.FILL) {
                text(GameVariation.FILL, 84, 300);
            }
            else {
                text(GameVariation.BLEND, 340, 300);
            }
        }

        pop();
    } 
}

/**
 * Writes the game's instructions
 * 
 * Since a monospace font is used, there's some "weird" spaces in the
 * text strings to keep them aligned.
 */
function drawGameInstructions() {
    push();
    textFont('Courier New');
    textAlign(LEFT, CENTER);
    fill(255);
    noStroke();
    textSize(28);
    text("UP / LEFT / DOWN / RIGHT  -  PLAYER 1 MOVEMENT", 0, 450);
    text("W  /  A   /  S   /   D    -  PLAYER 2 MOVEMENT", 0, 500);
    text("ENTER                     -  START GAME", 0, 600);
    pop();

    push();
    textFont('Courier New');
    textAlign(LEFT, CENTER);
    if (playAgainstCPU) {
        fill(255);
    }
    else {
        fill(0, 0, 115);
    }
    noStroke();
    textSize(28);
    text(`C                         -  PLAYER 2 AS CPU (${playAgainstCPU? "ON" : "OFF"})`, 0, 550);
    pop();
}

/**
 * Draws the current maze
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

    // Name of the maze at the bottom
    push();
    textFont('Courier New');
    textAlign(LEFT, CENTER);
    fill(255);
    noStroke();
    textSize(28);
    text(maze.name, maze.tileSize, height - maze.tileSize/2.5);
    pop();

    // Instruction to return to menu
    push();
    textFont('Courier New');
    textAlign(RIGHT, CENTER);
    fill(255);
    noStroke();
    textSize(28);
    text("ESC - RETURN TO MENU", width - maze.tileSize, height - maze.tileSize/2.5);
    pop();
}

/**
 * Moves the CPU entity in a random, valid position on a timer
 */
function moveCPU() {
    if (!cpuTimer.isMoving && (frameCount - cpuTimer.lastMoveFrameCount) % cpuTimer.frameCountMod === 0) {
        cpuTimer.isMoving = true;
        const optimalMoves = [];
        const otherMoves = [];
        let type;

        // Horizontal adjacent tiles check for walls
        for (let i = 0; i < 2; ++i) {
            type = maze.tiles[player2.iRow + (-1) ** i][player2.jCol].type;
            if (type !== MazeTileMap.WALL) {
                // Prioritize tiles that aren't the CPU's own trail
                if (type === MazeTileMap.EMPTY || type === MazeTileMap.PLAYER_1_SPAWN || type === MazeTileMap.PLAYER_1_TRAIL) {
                    optimalMoves.push({iIncr: (-1) ** i, jIncr: 0});
                }
                else {
                    otherMoves.push({iIncr: (-1) ** i, jIncr: 0});
                }
            }
        }
    
        // Vertical adjacent tiles check for walls
        for (let j = 0; j < 2; ++j) {
            type = maze.tiles[player2.iRow][player2.jCol + (-1) ** j].type;
            if (type !== MazeTileMap.WALL) {
                // Prioritize tiles that aren't the CPU's own trail
                if (type === MazeTileMap.EMPTY || type === MazeTileMap.PLAYER_1_SPAWN || type === MazeTileMap.PLAYER_1_TRAIL) {
                    optimalMoves.push({iIncr: 0, jIncr: (-1) ** j});
                }
                else {
                    otherMoves.push({iIncr: 0, jIncr: (-1) ** j});
                }
            }
        }
    
        let move;

        if (optimalMoves.length > 0) {
            move = random(optimalMoves);
        }
        else {
            move = random(otherMoves);
        }
    
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
 * Draws a player entity
 * @param {*} player which player
 * @param {*} name what name to display on the player
 */
function drawPlayer(player, name) {
    push();
    rectMode(CENTER);
    fill(player.colorFill.entity.h, player.colorFill.entity.s, player.colorFill.entity.b);
    stroke(0,0,player.colorFill.outline);
    rect(player.x, player.y, player.size);
    pop();

    push();
    textFont('Courier New');
    textAlign(CENTER, CENTER);
    fill(0,0,player.colorFill.outline);
    stroke(0,0,player.colorFill.outline);
    textSize(16);
    text(name, player.x, player.y);
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
 * @param {KeyboardEvent} evt the triggered event
 */
function keyPressed(evt) {
    if (isOnMenu) {
        checkMenuInput(evt);
    }
    else {
        checkGameInput(evt);
    }
}

/**
 * Checks the inputs while on the menu screen
 * @param {KeyboardEvent} evt the triggered event
 */
function checkMenuInput(evt) {
    if (evt.key === "Enter") {
        initMaze().then(
            () => {
                if (selectedVariation === GameVariation.FILL) {
                    colorManager = new ColorManagerFill();
                }
                else if (selectedVariation === GameVariation.BLEND) {
                    //TODO init manager
                }
                else {
                    //TODO init manager
                }
        
                isOnMenu = false;
            }
        );
    }
    else if (evt.key === "1" && selectedVariation !== GameVariation.FILL) {
        selectedVariationColorCounter = (selectedVariationColorCounter + 1) % 4;
        selectedVariation = GameVariation.FILL;
    }
    else if (evt.key === "2" && selectedVariation !== GameVariation.BLEND) {
        selectedVariationColorCounter = (selectedVariationColorCounter + 1) % 4;
        selectedVariation = GameVariation.BLEND;
    }
    else if (evt.key === "3" && selectedVariation !== GameVariation.COLORBLIND) {
        selectedVariation = GameVariation.COLORBLIND;
    }
    else if (evt.key === "c") {
        playAgainstCPU = !playAgainstCPU;
    }
}

/**
 * Checks the inputs for the players' movement
 * @param {KeyboardEvent} evt the triggered event
 */
function checkGameInput(evt) {
    if (evt.key === "Escape") {
        isOnMenu = true;
        resetMazes();
    }
    else {
        if (evt.key === "ArrowUp" && maze.tiles[player1.iRow - 1][player1.jCol].type !== 1) {
            player1.y -= maze.tileSize;
            player1.iRow = floor(player1.y / maze.tileSize);
            colorManager.changeTileColor(player1.iRow, player1.jCol, true);
            // TODO check overlap with player 2
        }
        else if (evt.key === "ArrowDown" && maze.tiles[player1.iRow + 1][player1.jCol].type !== 1) {
            player1.y += maze.tileSize;
            player1.iRow = floor(player1.y / maze.tileSize);
            colorManager.changeTileColor(player1.iRow, player1.jCol, true);
            // TODO check overlap with player 2
        }
        else if (evt.key === "ArrowLeft" && maze.tiles[player1.iRow][player1.jCol - 1].type !== 1) {
            player1.x -= maze.tileSize;
            player1.jCol = floor(player1.x / maze.tileSize);
            colorManager.changeTileColor(player1.iRow, player1.jCol, true);
            // TODO check overlap with player 2
        }
        else if (evt.key === "ArrowRight" && maze.tiles[player1.iRow][player1.jCol + 1].type !== 1) {
            player1.x += maze.tileSize;
            player1.jCol = floor(player1.x / maze.tileSize);
            colorManager.changeTileColor(player1.iRow, player1.jCol, true);
            // TODO check overlap with player 2
        }
        
        if (!playAgainstCPU) {
            if (evt.key === "w" && maze.tiles[player2.iRow - 1][player2.jCol].type !== 1) {
                player2.y -= maze.tileSize;
                player2.iRow = floor(player2.y / maze.tileSize);
                colorManager.changeTileColor(player2.iRow, player2.jCol, false);
                // TODO check overlap with player 1
            }
            else if (evt.key === "s" && maze.tiles[player2.iRow + 1][player2.jCol].type !== 1) {
                player2.y += maze.tileSize;
                player2.iRow = floor(player2.y / maze.tileSize);
                colorManager.changeTileColor(player2.iRow, player2.jCol, false);
                // TODO check overlap with player 1
            }
            else if (evt.key === "a" && maze.tiles[player2.iRow][player2.jCol - 1].type !== 1) {
                player2.x -= maze.tileSize;
                player2.jCol = floor(player2.x / maze.tileSize);
                colorManager.changeTileColor(player2.iRow, player2.jCol, false);
                // TODO check overlap with player 1
            }
            else if (evt.key === "d" && maze.tiles[player2.iRow][player2.jCol + 1].type !== 1) {
                player2.x += maze.tileSize;
                player2.jCol = floor(player2.x / maze.tileSize);
                colorManager.changeTileColor(player2.iRow, player2.jCol, false);
                // TODO check overlap with player 1
            }
        }
    }
}

/**
 * Initializes a random maze and the players' starting positions
 */
async function initMaze() {
    // Select a random maze
    maze = random(mazeData.dark_mazes);

    // Reset the players' data
    player1.size = maze.tileSize - 10;
    player1.iRow = undefined;
    player1.jCol = undefined;

    player2.size = maze.tileSize - 10;
    player2.iRow = undefined;
    player2.jCol = undefined;
    
    // TODO edit for colorblind mode
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
 * Resets the maze's trail tiles to be empty
 */
async function resetMazes() {
    for (let iRow = 0; iRow < maze.tiles.length; ++iRow) {
        for (let jCol = 0; jCol < maze.tiles[iRow].length; ++jCol) {
            if (maze.tiles[iRow][jCol].type === MazeTileMap.PLAYER_1_TRAIL || maze.tiles[iRow][jCol].type === MazeTileMap.PLAYER_2_TRAIL) {
                maze.tiles[iRow][jCol].h = 0;
                maze.tiles[iRow][jCol].s = 0;
                maze.tiles[iRow][jCol].b = 255;
                maze.tiles[iRow][jCol].type = MazeTileMap.EMPTY;
            }
        }
    }
}