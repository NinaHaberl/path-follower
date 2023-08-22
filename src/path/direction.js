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
function startMoving(surroundingCells) {
    var pathDirection;
    var right = surroundingCells[0], down = surroundingCells[1], left = surroundingCells[2], up = surroundingCells[3];
    var cellValues = [right, down, left, up];
    var cellNames = new Map([
        [0, 'Right'],
        [1, 'Down'],
        [2, 'Left'],
        [3, 'Up'],
    ]);
    var definedValues = [];
    cellValues.forEach(function (value, index) {
        if (typeof value !== " ") {
            definedValues.push({ value: value, index: index });
        }
    });
    console.log("jesmo li došli ovdje?");
    if (definedValues.length === 1) {
        var definedValue = definedValues[0];
        var valueName = cellNames[definedValue.index];
        console.log("Definirana vrijednost: " + definedValue.value + ", Indeks: " + definedValue.index + ", Ime: " + valueName);
        pathDirection = eval("Direction." + valueName);
    }
    else {
        console.log("nekaj ne valja");
        console.log(definedValues.length);
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
