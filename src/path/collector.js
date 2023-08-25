"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
function collectLettersAndFollowPath(map, startPosition) {
    // initialization of output fields
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var letterLocations = new Map();
    // initialization of path direction and positions
    var pathDirection = types_1.Direction.Start;
    var endOfPath = null;
    var row = startPosition === null || startPosition === void 0 ? void 0 : startPosition.row;
    var column = startPosition === null || startPosition === void 0 ? void 0 : startPosition.column;
    var position, nextPosition;
    var currentCharacter;
    var _loop_1 = function () {
        var _a;
        // initialize current position and surrounding cells;
        position = { row: row, column: column };
        var _b = direction_1.checkSurroundingCells(map, row, column), right = _b[0], down = _b[1], left = _b[2], up = _b[3];
        var surroundingCells = [right, down, left, up];
        var cellsWithCharacters = [];
        // throw out empty cells
        surroundingCells.forEach(function (character, direction) {
            if (/[A-Z]|-|\||\+|x/.test(character)) {
                cellsWithCharacters.push({ character: character, direction: direction });
            }
        });
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(cellsWithCharacters);
        }
        // set next position and surrounding cells;
        nextPosition = direction_1.setNewPosition(pathDirection, position);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);
        _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        if (currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }
        // validate path rules
        if (/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code;
            /*if(letterLocations.size !== 0 && !letterLocations.has(currentCharacter)) {
                letterLocations.set(currentCharacter, [row, column]);
                collectedLetters.push(currentCharacter);
            } else {
                let storedLocation = letterLocations.get(currentCharacter);
                let locationCheck = [row, column];

                if(!letterLocationExists(storedLocation, locationCheck)) {
                    letterLocations.set(currentCharacter, [row, column]);
                    collectedLetters.push(currentCharacter);
                }
            }*/
            if (updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }
            //checking if the letter is on the turn
            if ((pathDirection === types_1.Direction.Right && (right === " " || right === undefined)) ||
                (pathDirection === types_1.Direction.Left && (left === " " || left === undefined)) ||
                (pathDirection === types_1.Direction.Down && (down === " " || down === undefined)) ||
                (pathDirection === types_1.Direction.Up && (up === " " || up === undefined))) {
                pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection);
            }
        }
        // TODO: reduce code :P
        if (currentCharacter === "+") {
            if ((pathDirection === types_1.Direction.Right && /[A-Z]|-|\+|x/.test(right)) ||
                (pathDirection === types_1.Direction.Left && /[A-Z]|-|\+|x/.test(left)) ||
                (pathDirection === types_1.Direction.Down && /[A-Z]|\||\+|x/.test(down)) ||
                (pathDirection === types_1.Direction.Up && /[A-Z]|\||\+|x/.test(up))) {
                throw new Error("Invalid map: Fake turn");
            }
            pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection);
        }
        if (currentCharacter === "x") {
            endOfPath = "x";
        }
    };
    while (endOfPath !== "x") {
        _loop_1();
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
function updateLetterLocation(letterLocations, currentCharacter, row, column) {
    var storedLocation = letterLocations.get(currentCharacter);
    var currentLocation = [row, column];
    var storageUpdate = false;
    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, currentLocation);
        storageUpdate = true;
    }
    return storageUpdate;
}
function letterLocationExists(stored, current) {
    return JSON.stringify(stored) === JSON.stringify(current);
}
