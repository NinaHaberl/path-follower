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
    var row = startPosition === null || startPosition === void 0 ? void 0 : startPosition.row;
    var column = startPosition === null || startPosition === void 0 ? void 0 : startPosition.column;
    var oldPosition, nextPosition;
    var nextCharacter;
    while (endOfPath !== "x") {
        oldPosition = { row: row, column: column };
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(map, row, column, pathDirection);
        }
        nextCharacter = direction_1.getNextCellValue(pathDirection, map, row, column);
        nextPosition = direction_1.setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        pathAsCharacters.push(nextCharacter);
        if (/[A-Z]/.test(nextCharacter)) {
            // TODO: reduce code
            if (letterLocations.size !== 0 || !letterLocations.has(nextCharacter)) {
                letterLocations.set(nextCharacter, [row, column]);
                collectedLetters.push(nextCharacter);
            }
            else {
                var storedLocation = letterLocations.get(nextCharacter);
                var locationCheck = [row, column];
                if (!letterLocationExists(storedLocation, locationCheck)) {
                    letterLocations.set(nextCharacter, [row, column]);
                    collectedLetters.push(nextCharacter);
                }
            }
        }
        if (nextCharacter === "x") {
            endOfPath = "x";
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
function letterLocationExists(stored, collected) {
    return JSON.stringify(stored) === JSON.stringify(collected);
}
