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
    var currentCharacter;
    while (endOfPath !== "x") {
        console.log("Po\u010Detna pozicija startnog znaka je " + row + ", " + column);
        oldPosition = { row: row, column: column };
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.setPathDirection(map, row, column, pathDirection);
        }
        nextPosition = direction_1.setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        console.log("Kre\u0107emo se u stranu " + pathDirection + ", trenutna pozicija nam je na [" + row + "][" + column + "]");
        console.log("I na toj poziciji nam je znak " + currentCharacter + "\n\n");
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
            pathDirection = direction_1.makeTurn(map, row, column, pathDirection);
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
