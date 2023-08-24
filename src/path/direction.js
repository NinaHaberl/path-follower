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
function makeVerticalTurn(surroundingCharacters, currentDirection) {
    console.log(surroundingCharacters);
    return types_1.Direction.Down;
}
exports.makeVerticalTurn = makeVerticalTurn;
function makeHorizontalTurn(surroundingCharacters, currentDirection) {
}
exports.makeHorizontalTurn = makeHorizontalTurn;
function makeTurn(map, row, column, currentDirection) {
    var _a;
    // TODO: reduce code
    var _b = checkSurroundingCells(map, row, column), right = _b[0], down = _b[1], left = _b[2], up = _b[3];
    var surroundingCells = [right, down, left, up];
    var cellsWithCharacters = [];
    surroundingCells.forEach(function (character, direction) {
        if (/[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({ character: character, direction: direction });
        }
    });
    /* instead of switch/case */
    var directionToIndex = (_a = {},
        _a[types_1.Direction.Right] = 2,
        _a[types_1.Direction.Down] = 3,
        _a[types_1.Direction.Left] = 0,
        _a[types_1.Direction.Up] = 1,
        _a);
    var directionToRemove = directionToIndex[currentDirection];
    cellsWithCharacters = cellsWithCharacters.filter(function (_a) {
        var direction = _a.direction;
        return direction !== directionToRemove;
    });
    if (cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");
    }
    else {
        if (cellsWithCharacters.length === 1) {
            // TODO: check for fake turn
            if (/[A-Z]|-|\+|x/.test(right)) {
                throw new Error("Invalid map: Fake turn");
            }
            else {
                currentDirection = cellsWithCharacters[0].direction;
            }
        }
        else {
        }
    }
    return currentDirection;
}
exports.makeTurn = makeTurn;
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
function setNextCellValue(map, row, column, rowOffset, colOffset) {
    return map[row + rowOffset][column + colOffset];
}
function getCurrentCellValue(map, row, column) {
    return map[row][column];
}
exports.getCurrentCellValue = getCurrentCellValue;
