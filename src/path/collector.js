"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
function collectLettersAndFollowPath(map, startPosition) {
    var _a, _b;
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
        oldPosition = { row: row, column: column };
        var _c = direction_1.checkSurroundingCells(map, row, column), right = _c[0], down = _c[1], left = _c[2], up = _c[3];
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(cellsWithCharacters);
        }
        nextPosition = direction_1.setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);
        if (currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }
        if (/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code;
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
            //checking if the letter is on the turn
            _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
            if ((pathDirection === types_1.Direction.Right && (right === " " || right === undefined)) ||
                (pathDirection === types_1.Direction.Left && (left === " " || left === undefined)) ||
                (pathDirection === types_1.Direction.Down && (down === " " || down === undefined)) ||
                (pathDirection === types_1.Direction.Up && (up === " " || up === undefined))) {
                pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection);
            }
        }
        // TODO: reduce code :P
        if (currentCharacter === "+") {
            _b = direction_1.checkSurroundingCells(map, row, column), right = _b[0], down = _b[1], left = _b[2], up = _b[3];
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
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
function letterLocationExists(stored, collected) {
    return JSON.stringify(stored) === JSON.stringify(collected);
}
