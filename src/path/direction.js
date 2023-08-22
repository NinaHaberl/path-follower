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
        if (/[A-Z]|-|\||\+/.test(value)) {
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
function getSurroundingCells(map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if (!(column >= (map[row].length - 1))) {
        right = map[row][column + 1];
    }
    if (!(row >= (map.length - 1))) {
        down = map[row + 1][column];
    }
    if (column !== 0) {
        left = map[row][column - 1];
    }
    if (row !== 0) {
        up = map[row - 1][column];
    }
    return [right, down, left, up];
}
exports.getSurroundingCells = getSurroundingCells;
