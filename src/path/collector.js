"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
function collectLettersAndFollowPath(map, startPosition) {
    // initialization of output fields
    var letterLocations = new Map();
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    // initialization of path direction and positions
    var pathDirection = types_1.Direction.Start;
    var endOfPath = null;
    var cellsWithCharacters = [];
    var row = startPosition === null || startPosition === void 0 ? void 0 : startPosition.row;
    var column = startPosition === null || startPosition === void 0 ? void 0 : startPosition.column;
    var oldPosition, nextPosition;
    var currentCharacter;
    var _loop_1 = function () {
        var _a;
        oldPosition = { row: row, column: column };
        var _b = direction_1.checkSurroundingCells(map, row, column), right = _b[0], down = _b[1], left = _b[2], up = _b[3];
        var surroundingCells = [right, down, left, up];
        var cellsWithCharacters_1 = [];
        // throw out empty cells
        surroundingCells.forEach(function (character, direction) {
            if (/[A-Z]|-|\||\+|x/.test(character)) {
                cellsWithCharacters_1.push({ character: character, direction: direction });
            }
        });
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(cellsWithCharacters_1);
        }
        nextPosition = direction_1.setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);
        if (/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code;
            //  BUG - 'Do not collect a letter from the same location twice' not working
            console.log("Trenutni znak koji smo pro\u010Ditali je " + currentCharacter + ", na adresi [" + row + "][" + column + "]");
            if (letterLocations.size !== 0 && !letterLocations.has(currentCharacter)) {
                letterLocations.set(currentCharacter, [row, column]);
                collectedLetters.push(currentCharacter);
            }
            else {
                var storedLocation = letterLocations.get(currentCharacter);
                var locationCheck = [row, column];
                if (!letterLocationExists(storedLocation, locationCheck)) {
                    letterLocations.set(currentCharacter, [row, column]);
                    collectedLetters.push(currentCharacter);
                }
            }
        }
        // TODO: reduce code :P
        if (currentCharacter === "+") {
            _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
            surroundingCells = [right, down, left, up];
            if ((pathDirection === types_1.Direction.Right && /[A-Z]|-|\+|x/.test(right)) ||
                (pathDirection === types_1.Direction.Left && /[A-Z]|-|\+|x/.test(left)) ||
                (pathDirection === types_1.Direction.Down && /[A-Z]|\||\+|x/.test(down)) ||
                (pathDirection === types_1.Direction.Up && /[A-Z]|\||\+|x/.test(up))) {
                throw new Error("Invalid map: Fake turn");
            }
            if (pathDirection === types_1.Direction.Right || pathDirection === types_1.Direction.Left) {
                if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                    throw new Error("Invalid map: Fork in path");
                }
                else {
                    if ((up === " " || up === undefined) && /[A-Z]|\||\+|x/.test(down)) {
                        pathDirection = types_1.Direction.Down;
                    }
                    else {
                        pathDirection = types_1.Direction.Up;
                    }
                }
            }
            else if (pathDirection === types_1.Direction.Up || pathDirection === types_1.Direction.Down) {
                if (/[A-Z]|-|\+|x/.test(right) && /[A-Z]|-|\+|x/.test(left)) {
                    throw new Error("Invalid map: Fork in path");
                }
                else {
                    if ((right === " " || right === undefined) && /[A-Z]|-|\+|x/.test(left)) {
                        pathDirection = types_1.Direction.Left;
                    }
                    else {
                        pathDirection = types_1.Direction.Right;
                    }
                }
            }
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
function letterLocationExists(stored, collected) {
    return JSON.stringify(stored) === JSON.stringify(collected);
}
function getCellsWithCharacters(map, row, column) {
    var _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
    var surroundingCells = [right, down, left, up];
    var cells = [];
    // throw out empty cells
    surroundingCells.forEach(function (character, direction) {
        if (/[A-Z]|-|\||\+|x/.test(character)) {
            cells.push({ character: character, direction: direction });
        }
    });
    return cells;
}
