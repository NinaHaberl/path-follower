"use strict";
exports.__esModule = true;
var types_1 = require("../types");
// export const setPathDirection = (map: string[][], row: number, column: number): number => {
//
//     let [right, down, left, up] = checkSurroundingCells(map, row, column);
//     let horizontalDirection, verticalDirection = false;
//
//     const verticalRule: RegExp = /[A-Z]|\||\+|x/;
//     const horizontalRule: RegExp = /[A-Z]|-|\+|x/;
//
//     if(right && left) {
//         if(verticalRule.test(right) && verticalRule.test(left)) {
//             throw new Error("Invalid map: Fork in path after starting position");
//         } else {
//             verticalDirection = true;
//         }
//     } else if(down && up) {
//
//     }
//     return Direction.Right;
// }
exports.setPathDirection = function (map, row, column) {
    var direction;
    var _a = checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
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
            var horizontalDirection = false;
            var verticalDirection = false;
            for (var x = 0; x < cellsWithCharacters.length; x++) {
                var _b = cellsWithCharacters[x], direction_1 = _b.direction, character = _b.character;
                switch (direction_1) {
                    case types_1.Direction.Right:
                        break;
                    case types_1.Direction.Down:
                        break;
                    case types_1.Direction.Left:
                        break;
                    case types_1.Direction.Up:
                        break;
                }
            }
            // for (let x = 0; x < cellsWithCharacters.length; x++) {
            //     switch (cellsWithCharacters[x].direction) {
            //         case Direction.Right:
            //             if(horizontalDirection === false && horizontalRule.test(cellsWithCharacters[x].character)) {
            //                 horizontalDirection = true;
            //                 direction = cellsWithCharacters[x].direction;
            //                 break;
            //             } else {
            //                 throw new Error("Invalid map: Multiple starting paths");
            //             }
            //
            //         case Direction.Down:
            //             if(verticalDirection === false && verticalRule.test(cellsWithCharacters[x].character)) {
            //                 verticalDirection = true;
            //                 direction = cellsWithCharacters[x].direction;
            //                 break;
            //             } else {
            //                 throw new Error("Invalid map: Multiple starting paths");
            //             }
            //
            //         case Direction.Left:
            //             if(horizontalDirection === false && horizontalRule.test(cellsWithCharacters[x].character)) {
            //                 horizontalDirection = true;
            //                 direction = cellsWithCharacters[x].direction;
            //                 break;
            //             } else {
            //                 throw new Error("Invalid map: Multiple starting paths");
            //             }
            //
            //         case Direction.Up:
            //             if(verticalDirection === false && verticalRule.test(cellsWithCharacters[x].character)) {
            //                 verticalDirection = true;
            //                 direction = cellsWithCharacters[x].direction;
            //                 break;
            //             } else {
            //                 throw new Error("Invalid map: Multiple starting paths");
            //             }
            //     }
            //     console.log(cellsWithCharacters[x].direction);
            //     console.log(cellsWithCharacters[x].character);
        }
    }
    return direction;
};
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
exports.setNextCellValue = setNextCellValue;
function getCurrentCellValue(map, row, column) {
    return map[row][column];
}
exports.getCurrentCellValue = getCurrentCellValue;
function makeTurn(right, down, left, up, direction, verticalRule, horizontalRule) {
    if (direction === types_1.Direction.Right || direction === types_1.Direction.Left) {
        if ((up === " " || up === undefined) && verticalRule.test(down)) {
            direction = types_1.Direction.Down;
        }
        else if ((down === " " || down === undefined) && verticalRule.test(up)) {
            direction = types_1.Direction.Up;
        }
        else if ((down === " " || down === undefined) && (up === " " || up === undefined)) {
            throw new Error("Invalid map - Broken path after vertical turn");
        }
    }
    else if (direction === types_1.Direction.Up || direction === types_1.Direction.Down) {
        if ((right === " " || right === undefined) && horizontalRule.test(left)) {
            direction = types_1.Direction.Left;
        }
        else if ((left === " " || left === undefined) && horizontalRule.test(right)) {
            direction = types_1.Direction.Right;
        }
        else if ((right === " " || right === undefined) && (left === " " || left === undefined)) {
            throw new Error("Invalid map - Broken path after horizontal turn");
        }
    }
    return direction;
}
exports.makeTurn = makeTurn;
