"use strict";
exports.__esModule = true;
function validateMapAndFindStartingPosition(map) {
    var startCharacter = false;
    var endingCharacter = false;
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
                    endingCharacter = true;
                default:
                    if (!/^\s*$|[A-Z]|-|\||\+|x/.test(map[row][column])) {
                        throw new Error("Invalid map - Map contains invalid character " + map[row][column] + ". The only valid characters are all uppercase letters (A-Z), minus (-), plus (+), pipe character (|) and 'x' as ending character.");
                    }
            }
        }
    }
    if (startPosition === undefined && startCharacter === false) {
        throw new Error("Invalid map - There is no start character!");
    }
    else {
        if (endingCharacter === false) {
            throw new Error("Invalid map - Missing end character");
        }
    }
    return startPosition;
}
exports.validateMapAndFindStartingPosition = validateMapAndFindStartingPosition;
