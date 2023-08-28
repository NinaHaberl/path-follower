"use strict";
exports.__esModule = true;
exports.validateMapAndFindStartingPosition = function (map) {
    var endingCharacter = false;
    var startPosition = undefined;
    var start = "@";
    var end = "x";
    for (var row = 0; row < map.length; row++) {
        for (var column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case start:
                    if (!startPosition) {
                        startPosition = { row: row, column: column };
                    }
                    else {
                        throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                    }
                    break;
                case end:
                    endingCharacter = true;
                    break;
                default:
                    if (!exports.isValidMapCharacter(map[row][column])) {
                        throw new Error("Invalid map - Map contains invalid character " + map[row][column] + ". The only valid characters are all uppercase letters (A-Z), minus (-), plus (+), pipe character (|) and 'x' as ending character.");
                    }
            }
        }
    }
    if (startPosition === undefined) {
        throw new Error("Invalid map - There is no start character!");
    }
    else {
        if (!endingCharacter) {
            throw new Error("Invalid map - Missing end character");
        }
    }
    return startPosition;
};
exports.isValidMapCharacter = function (character) { return /^\s*$|[A-Z]|-|\||\+|x/.test(character); };
