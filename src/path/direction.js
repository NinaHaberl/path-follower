"use strict";
exports.__esModule = true;
var types_1 = require("../types");
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
function setPathDirection(right, down, left, up) {
    var pathDirection;
    var surroundingCells = [right, down, left, up];
    var definedCell = [];
    surroundingCells.forEach(function (value, index) {
        if (/[A-Z]|-|\||\+|x/.test(value)) {
            console.log(value);
            console.log(index);
            definedCell.push({ value: value, index: index });
        }
    });
    if (definedCell.length === 0) {
        throw new Error("Invalid map: Broken path after @ character");
    }
    else if (definedCell.length === 1) {
        pathDirection = definedCell[0].index;
    }
    else {
        console.log(definedCell.length);
    }
    return pathDirection;
}
exports.setPathDirection = setPathDirection;
function checkSurroundingCells(map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
     * TODO: refactor [reduce code]
     */
    if (!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);
        ;
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
function getNextCellValue(pathDirection, map, row, column) {
    var rowOffset = 0;
    var colOffset = 0;
    switch (pathDirection) {
        case types_1.Direction.Right:
            colOffset = 1;
            break;
        case types_1.Direction.Down:
            rowOffset = 1;
            break;
        case types_1.Direction.Left:
            colOffset = -1;
            break;
        case types_1.Direction.Up:
            rowOffset = -1;
            break;
    }
    return setNextCellValue(map, row, column, rowOffset, colOffset);
}
exports.getNextCellValue = getNextCellValue;
function setNextCellValue(map, row, column, rowOffset, colOffset) {
    return map[row + rowOffset][column + colOffset];
}
