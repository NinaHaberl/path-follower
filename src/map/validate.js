"use strict";
exports.__esModule = true;
function validateMapAndFindStartingPosition(map) {
    var startCharacter = false;
    var stopCharacter = false;
    var startPosition = undefined;
    for (var row = 0; row < map.length; row++) {
        for (var column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case "@":
                    if (startCharacter === false) {
                        startCharacter = true;
                        startPosition = { row: row, column: column };
                    }
                    else {
                        throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                    }
                    break;
                case "x":
                    if (stopCharacter === false) {
                        stopCharacter = true;
                    }
                    else {
                        throw new Error("Invalid map - Multiple stops: map contains more than one 'x' character");
                    }
                    break;
                default:
                    if (!/^\s*$|[A-Z]|-|\||\+/.test(map[row][column])) {
                        throw new Error("Invalid map - Map contains invalid character " + map[row][column] + ". The only valid characters are all uppercase letters (A-Z), minus (-), plus (+) and pipe character (|).");
                    }
            }
        }
    }
    if (startPosition !== undefined && startCharacter === true && stopCharacter === true) {
        return startPosition;
    }
    else {
        errorInvalidStartOrStopCharacter(startCharacter, stopCharacter);
    }
}
exports.validateMapAndFindStartingPosition = validateMapAndFindStartingPosition;
function errorInvalidStartOrStopCharacter(start, stop) {
    if (start === false && stop === false) {
        throw new Error("Invalid map - There is no start nor stop character!");
    }
    else if (start === true && stop === false) {
        throw new Error("Invalid map - There is no stop character!");
    }
    else if (start === false && stop === true) {
        throw new Error("Invalid map - There is no start character!");
    }
}
