"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var validate_1 = require("../map/validate");
var getCellsWithCharacters = function (cells) {
    var cellsWithCharacters = [];
    cells.forEach(function (character, direction) {
        // throw out empty cells
        if (character && /[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({ character: character, direction: direction });
        }
    });
    return cellsWithCharacters;
};
var isHorizontalDirection = function (c) { return c.direction === types_1.Direction.Right || c.direction === types_1.Direction.Left; };
var isVerticalDirection = function (c) { return c.direction === types_1.Direction.Up || c.direction === types_1.Direction.Down; };
exports.getPathDirection = function (map, position) {
    var surroundingCells = exports.getSurroundingCells(map, position);
    var surroundingCellsWithCharacters = getCellsWithCharacters(surroundingCells);
    var validStartingPaths = surroundingCellsWithCharacters
        .filter(function (c) {
        return (isHorizontalDirection(c) && validate_1.isHorizontalDirectionCharacterValid(c.character)) ||
            (isVerticalDirection(c) && validate_1.isVerticalDirectionCharacterValid(c.character));
    });
    if (validStartingPaths.length == 0) {
        throw new Error("Invalid map: Broken path after starting position");
    }
    if (validStartingPaths.length > 1) {
        throw new Error("Invalid map: Multiple starting paths");
    }
    return validStartingPaths[0].direction;
};
exports.getNewPosition = function (direction, position) {
    var row = position.row;
    var column = position.column;
    switch (direction) {
        case types_1.Direction.Right:
            column = column + 1;
            break;
        case types_1.Direction.Down:
            row = row + 1;
            break;
        case types_1.Direction.Left:
            column = column - 1;
            break;
        case types_1.Direction.Up:
            row = row - 1;
            break;
    }
    return { row: row, column: column };
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
exports.getSurroundingCells = function (map, position) {
    var row = position.row;
    var column = position.column;
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
exports.checkLShapedFork = function (pathDirection, verticalRule, horizontalRule, right, down, left, up) {
    if ((pathDirection === types_1.Direction.Right || pathDirection === types_1.Direction.Left) && (verticalRule.test(up) || verticalRule.test(down)) ||
        (pathDirection === types_1.Direction.Up || pathDirection === types_1.Direction.Down) && (horizontalRule.test(right) || horizontalRule.test(left))) {
        throw new Error("Invalid map: Fork in path - L shaped fork");
    }
};
exports.checkTShapedFork = function (pathDirection, verticalRule, horizontalRule, right, down, left, up) {
    if ((pathDirection === types_1.Direction.Right || pathDirection === types_1.Direction.Left) && verticalRule.test(up) && verticalRule.test(down) ||
        (pathDirection === types_1.Direction.Up || pathDirection === types_1.Direction.Down) && horizontalRule.test(right) && horizontalRule.test(left)) {
        throw new Error("Invalid map: Fork in path - T shaped fork");
    }
};
