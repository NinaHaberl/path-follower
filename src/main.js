"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 * NOTE: We assume that we read all maps from left to right, from top to bottom
 */
exports.__esModule = true;
var validBasicExample_1 = require("../maps/validBasicExample");
//import map from "../maps/invalidMissingStartCharacter";
function findStartingPoint(map) {
    var startingCharacterRow = -1;
    var startingCharacterColumn = -1;
    for (var row = 0; row < map.length; row++) {
        for (var column = 0; column < map[row].length; column++) {
            if (map[row][column] === "@") {
                if (startingCharacterRow !== -1 || startingCharacterColumn !== -1) {
                    throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                }
                startingCharacterRow = row;
                startingCharacterColumn = column;
            }
        }
    }
    if (startingCharacterRow === -1 || startingCharacterColumn === -1) {
        throw new Error("Invalid map - Missing start character: map doesn't contain starting '@' character");
    }
    return { row: startingCharacterRow, column: startingCharacterColumn };
}
var startingPoint = findStartingPoint(validBasicExample_1["default"]);
if (startingPoint) {
    console.log("Starting point position is on [" + startingPoint.row + "][" + startingPoint.column + "]");
    // Print the map
    for (var _i = 0, map_1 = validBasicExample_1["default"]; _i < map_1.length; _i++) {
        var row = map_1[_i];
        console.log(row.join(''));
    }
}
else {
    throw new Error("Oops, something went totally wrong...");
}
