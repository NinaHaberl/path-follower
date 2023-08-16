"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 * NOTE: We assume that we read all maps from left to right, from top to bottom
 */
exports.__esModule = true;
//import map from "../maps/validBasicExample";
//import map from "../maps/invalidMissingStartCharacter";
//import map from "../maps/invalidMultipleStartsA";
//import map from "../maps/invalidMultipleStartsB";
//import map from "../maps/invalidMissingEndCharacter";
var invalidMissingStartAndStop_1 = require("../maps/invalidMissingStartAndStop");
function checkForStartStopAndInvalidCharacters(map) {
    var startCharacter = false;
    var stopCharacter = false;
    var mapValidated = false;
    for (var row = 0; row < map.length; row++) {
        for (var column = 0; column < map[row].length; column++) {
            switch (map[row][column]) {
                case "@":
                    if (startCharacter === false) {
                        startCharacter = true;
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
    if (startCharacter === false && stopCharacter === false) {
        throw new Error("Invalid map - There is no start nor stop character!");
    }
    else if (startCharacter === true && stopCharacter === false) {
        throw new Error("Invalid map - There is no stop character!");
    }
    else if (startCharacter === false && stopCharacter === true) {
        throw new Error("Invalid map - There is no start character!");
    }
    else {
        mapValidated = true;
    }
    return { validMap: mapValidated };
}
var mapValidation = checkForStartStopAndInvalidCharacters(invalidMissingStartAndStop_1["default"]);
if (mapValidation) {
    for (var _i = 0, map_1 = invalidMissingStartAndStop_1["default"]; _i < map_1.length; _i++) {
        var row = map_1[_i];
        console.log(row.join(''));
    }
}
else {
    throw new Error("Oops, something went totally wrong...");
}
function findStartingCharacter(map) {
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
