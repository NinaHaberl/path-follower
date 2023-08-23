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
function setPathDirection(map, row, column, direction) {
    var _a = checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
    var surroundingCells = [right, down, left, up];
    var cellsWithCharacters = [];
    // collect the characters from all surrounding cells
    surroundingCells.forEach(function (character, direction) {
        if (/[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({ character: character, direction: direction });
        }
    });
    if (cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");
    }
    else {
        if (cellsWithCharacters.length === 1) {
            direction = cellsWithCharacters[0].direction;
        }
        else {
            if (direction === types_1.Direction.Start) {
                /* TODO: think about edge cases of valid maps, for example

                 `
                    ++
                    @x
                 `,
                 `
                    +--A
                    |@-+
                    |
                    x
                 `
                  */
                throw new Error("Invalid map: Multiple starting paths");
            }
            else {
                if (direction === types_1.Direction.Right || direction === types_1.Direction.Left) {
                    if (!/[A-Z]|\||\+|x/.test(right)) {
                        throw new Error('Invalid map: Broken path - illegal character');
                    }
                }
                if (direction === types_1.Direction.Up || direction === types_1.Direction.Down) {
                    if (!/[A-Z]|\+|\|x/.test(up)) {
                        throw new Error('Invalid map: Broken path - illegal character');
                    }
                }
            }
        }
    }
    return direction;
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
