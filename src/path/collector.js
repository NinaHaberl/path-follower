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
        // validate path rules
        // after direction and surrounding cells setup
        _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        var nextCell = pathDirection === types_1.Direction.Right ? right :
            pathDirection === types_1.Direction.Left ? left :
                pathDirection === types_1.Direction.Down ? down :
                    pathDirection === types_1.Direction.Up ? up : "";
        var positionRules = new Map([
            [types_1.Direction.Right, /[A-Z]|-|\+|x/],
            [types_1.Direction.Left, /[A-Z]|-|\+|x/],
            [types_1.Direction.Down, /[A-Z]|\||\+|x/],
            [types_1.Direction.Up, /[A-Z]|\||\+|x/]
        ]);
        var directionValidation = positionRules.get(pathDirection);
        if (currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }
        if (/[A-Z]/.test(currentCharacter)) {
            if (updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }
            if (nextCell === " " || nextCell === undefined) {
                pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection);
            }
        }
        if (currentCharacter === "+") {
            console.log("Karakter je " + currentCharacter + ", smijer je " + pathDirection);
            console.log("\u0106elija iznad je " + up + ", ispod je " + down);
            console.log("regex = " + directionValidation + "; provjeravamo nextCell: " + nextCell);
            if (directionValidation.test(nextCell)) {
                var verticalRule = /[A-Z]|\||\+|x/;
                var horizontalRule = /[A-Z]|-|\+|x/;
                if (pathDirection === types_1.Direction.Right || pathDirection === types_1.Direction.Left) {
                    console.log("jesmo li ovdje?"); // forkInPathVerA ne radi :P
                    if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }
                else if (pathDirection === types_1.Direction.Up || pathDirection === types_1.Direction.Down) {
                    if (/[A-Z]|-|\+|x/.test(right) || /[A-Z]|-|\+|x/.test(left)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }
                throw new Error("Invalid map: Fake turn");
            }
            else {
                if (pathDirection === types_1.Direction.Right || pathDirection === types_1.Direction.Left) {
                    console.log("jesmo li ovdje?"); // forkInPathVerA ne radi :P
                    if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }
                else if (pathDirection === types_1.Direction.Up || pathDirection === types_1.Direction.Down) {
                    if (/[A-Z]|-|\+|x/.test(right) || /[A-Z]|-|\+|x/.test(left)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }
            }
            pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection);
        }
        if (currentCharacter === "x") {
            endOfPath = "x";
        }
    };
    // follow path
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
