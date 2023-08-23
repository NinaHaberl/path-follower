"use strict";
exports.__esModule = true;
var types_1 = require("../types");
function setPathDirection(direction, right, down, left, up) {
    var horizontalDirection = false;
    var verticalDirection = false;
    if (direction === types_1.Direction.Start) {
        if (/[A-Z]|-|\+|x/.test(left)) {
            if (horizontalDirection === true) {
                throw new Error("Invalid map - Fork in path");
            }
            else {
            }
        }
    }
}
exports.setPathDirection = setPathDirection;
function startMoving(right, down, left, up) {
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
        console.log("Next position: " + definedCell[0].value + "; direction: " + definedCell[0].index);
        pathDirection = definedCell[0].index;
    }
    else {
        console.log(definedCell.length);
    }
    return pathDirection;
}
exports.startMoving = startMoving;
function checkSurroundingCells(map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
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
    var cellValue = "";
    switch (pathDirection) {
        case types_1.Direction.Right:
            cellValue = setNextCellValue(map, row, column, 0, 1);
            break;
        case types_1.Direction.Down:
            cellValue = setNextCellValue(map, row, column, 1, 0);
            break;
        case types_1.Direction.Left:
            cellValue = setNextCellValue(map, row, column, 0, -1);
            break;
        case types_1.Direction.Up:
            cellValue = setNextCellValue(map, row, column, -1, 0);
            break;
    }
    return cellValue;
}
exports.getNextCellValue = getNextCellValue;
function setNextCellValue(map, row, column, rowOffset, colOffset) {
    return map[row + rowOffset][column + colOffset];
}
