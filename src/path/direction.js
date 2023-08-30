"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var validate_1 = require("../map/validate");
var setPathDirection = function (start, direction) {
    if (!start) {
        return direction;
    }
    else {
        throw new Error("Invalid map: Multiple starting paths");
    }
};
exports.getPathDirection = function (map, row, column) {
    var pathDirection = -1;
    var _a = exports.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
    var surroundingCells = [right, down, left, up];
    var cellsWithCharacters = [];
    // throw out empty cells
    surroundingCells.forEach(function (character, direction) {
        if (character && /[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({ character: character, direction: direction });
        }
    });
    if (cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path after starting position");
    }
    else {
        if (cellsWithCharacters.length === 1) {
            pathDirection = cellsWithCharacters[0].direction;
        }
        else {
            var startDirection_1 = false;
            cellsWithCharacters.forEach(function (cell) {
                var character = cell.character, direction = cell.direction;
                if (direction === types_1.Direction.Right || direction === types_1.Direction.Left) {
                    if (validate_1.isHorizontalDirectionCharacterValid(character)) {
                        pathDirection = setPathDirection(startDirection_1, direction);
                        startDirection_1 = true;
                    }
                }
                else if (direction === types_1.Direction.Up || direction === types_1.Direction.Down) {
                    if (validate_1.isVerticalDirectionCharacterValid(character)) {
                        pathDirection = setPathDirection(startDirection_1, direction);
                        startDirection_1 = true;
                    }
                }
            });
        }
    }
    return pathDirection;
};
exports.setNewPosition = function (direction, position) {
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
};
exports.checkSurroundingCells = function (map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if (!(column >= (map[row].length - 1))) {
        right = exports.setNextCellValue(map, row, column, 0, 1);
    }
    if (!(row >= (map.length - 1))) {
        down = exports.setNextCellValue(map, row, column, 1, 0);
    }
    if (column !== 0) {
        left = exports.setNextCellValue(map, row, column, 0, -1);
    }
    if (row !== 0) {
        up = exports.setNextCellValue(map, row, column, -1, 0);
    }
    return [right, down, left, up];
};
exports.setNextCellValue = function (map, row, column, rowOffset, colOffset) {
    return map[row + rowOffset][column + colOffset];
};
exports.getCurrentCellValue = function (map, row, column) {
    return map[row][column];
};
exports.makeTurn = function (right, down, left, up, direction, verticalRule, horizontalRule) {
    if (direction === types_1.Direction.Right || direction === types_1.Direction.Left) {
        if (((up === " " || up === undefined) || /-/.test(up)) && verticalRule.test(down)) {
            direction = types_1.Direction.Down;
        }
        else if (((down === " " || down === undefined) || /-/.test(down)) && verticalRule.test(up)) {
            direction = types_1.Direction.Up;
        }
        else if ((down === " " || down === undefined) && (up === " " || up === undefined)) {
            throw new Error("Invalid map - Broken path after vertical turn");
        }
    }
    else if (direction === types_1.Direction.Up || direction === types_1.Direction.Down) {
        if (((right === " " || right === undefined) || /\|/.test(right)) && horizontalRule.test(left)) {
            direction = types_1.Direction.Left;
        }
        else if (((left === " " || left === undefined) || /\|/.test(left)) && horizontalRule.test(right)) {
            direction = types_1.Direction.Right;
        }
        else if ((right === " " || right === undefined) && (left === " " || left === undefined)) {
            throw new Error("Invalid map - Broken path after horizontal turn");
        }
    }
    return direction;
};
