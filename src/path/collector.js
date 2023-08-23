"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
function collectLettersAndFollowPath(map, startPosition) {
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var row = startPosition.row, column = startPosition.column;
    var nextPosition;
    var pathDirection = types_1.Direction.Start;
    var endOfPath = null;
    while (endOfPath !== "x") {
        var _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        if (pathDirection === types_1.Direction.Start) {
            // pathDirection === ENUM (0 = right; 1 = down ...)
            // Direction.Right === 0 (0 = right)
            pathDirection = direction_1.startMoving(right, down, left, up);
            nextPosition = direction_1.getNextCellValue(pathDirection, map, row, column);
        }
        else {
            nextPosition = direction_1.getNextCellValue(pathDirection, map, row, column);
        }
        pathAsCharacters.push(nextPosition);
        if (nextPosition === "x") {
            endOfPath = "x";
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
