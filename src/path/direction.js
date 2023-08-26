"use strict";
exports.__esModule = true;
var types_1 = require("../types");
function setPathDirection(cellsWithCharacters) {
    var direction;
    if (cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");
    }
    else {
        if (cellsWithCharacters.length === 1) {
            direction = cellsWithCharacters[0].direction;
        }
        else {
            /* TODO: think about edge cases of valid maps, for example
            `
                 +--A
                 |@-+
                 |
                 x
             `
             */
            throw new Error("Invalid map: Multiple starting paths");
        }
    }
    return direction;
}
exports.setPathDirection = setPathDirection;
function setNewPosition(direction, position) {
    switch (direction) {
        case types_1.Direction.Right:
            position.column = position.column + 1;
            break;
        case types_1.Direction.Down:
            position.row = position.row + 1;
            break;
        case types_1.Direction.Left:
            position.column = position.column - 1;
            break;
        case types_1.Direction.Up:
            position.row = position.row - 1;
            break;
    }
    return position;
}
exports.setNewPosition = setNewPosition;
function checkSurroundingCells(map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
     * TODO: refactor [reduce code]
     */
    if (!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);
    }
    if (!(row >= (map.length - 1))) {
        down = setNextCellValue(map, row, column, 1, 0);
    }
    if (column !== 0) {
        left = setNextCellValue(map, row, column, 0, -1);
    }
    if (row !== 0) {
        up = setNextCellValue(map, row, column, -1, 0);
    }
    return [right, down, left, up];
}
exports.checkSurroundingCells = checkSurroundingCells;
function setNextCellValue(map, row, column, rowOffset, colOffset) {
    return map[row + rowOffset][column + colOffset];
}
function getCurrentCellValue(map, row, column) {
    return map[row][column];
}
exports.getCurrentCellValue = getCurrentCellValue;
function makeTurn(right, down, left, up, direction) {
    // TODO: recude code
    if (direction === types_1.Direction.Right || direction === types_1.Direction.Left) {
        if ((up === " " || up === undefined) && /[A-Z]|\||\+|x/.test(down)) {
            direction = types_1.Direction.Down;
        }
        else {
            direction = types_1.Direction.Up;
        }
    }
    else if (direction === types_1.Direction.Up || direction === types_1.Direction.Down) {
        if ((right === " " || right === undefined) && /[A-Z]|-|\+|x/.test(left)) {
            direction = types_1.Direction.Left;
        }
        else {
            direction = types_1.Direction.Right;
        }
    }
    return direction;
}
exports.makeTurn = makeTurn;
