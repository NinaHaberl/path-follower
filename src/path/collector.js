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
    while (endOfPath !== "x") {
        console.log("trenutna pozicija je: [" + row + "][" + column + "]: trenutni znak je: " + map[row][column]);
        oldPosition = { row: row, column: column };
        cellsWithCharacters = getCellsWithCharacters(map, row, column);
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(cellsWithCharacters);
        }
        nextPosition = direction_1.setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);
        if (/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code
            if (letterLocations.size !== 0 || !letterLocations.has(currentCharacter)) {
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
        if (/\+/.test(currentCharacter)) {
            // check surrounding cells before making turn
            cellsWithCharacters = getCellsWithCharacters(map, row, column);
            if (pathDirection === types_1.Direction.Right, types_1.Direction.Left) {
                pathDirection = direction_1.makeVerticalTurn(cellsWithCharacters, pathDirection);
            }
            else {
                pathDirection = direction_1.makeHorizontalTurn(cellsWithCharacters, pathDirection);
            }
        }
        if (currentCharacter === "x") {
            endOfPath = "x";
        }
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
