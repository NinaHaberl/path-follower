"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */
exports.__esModule = true;
var types_1 = require("../src/types");
var valid = require("../maps/valid");
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
function setPathDirection(right, down, left, up) {
    return types_1.Direction.Right;
}
function collectLettersAndFollowPath(map, startPosition) {
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var row = startPosition.row, column = startPosition.column;
    var pathDirection = types_1.Direction.Start;
    var endOfPath = null;
    var cellLeft = "";
    var cellRight = "";
    var cellAbove = "";
    var cellBellow = "";
    var currentCell = "";
    var newPosition = { row: row, column: column };
    while (endOfPath !== "x") {
        currentCell = map[row][column];
        //cellLeft = map[row][column - 1];
        cellRight = map[row][column + 1];
        //cellAbove = map[row - 1][column];
        //cellBellow = map[row + 1][column];
        if (pathDirection === 0) {
            pathDirection = setPathDirection(cellRight, cellBellow, cellLeft, cellAbove);
            console.log("vratio mi je " + pathDirection);
            if (cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
var map = valid.minimumMap;
var startPosition = validateMapAndFindStartingPosition(map);
if (startPosition !== undefined) {
    var output = collectLettersAndFollowPath(map, startPosition);
    console.log("Collected letters: " + output.letters);
    console.log("Path as characters: " + output.path);
}
