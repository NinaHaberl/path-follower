"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */
exports.__esModule = true;
var types_1 = require("../src/types");
var maps = require("./map/examples");
var validate_1 = require("./map/validate");
function setPathDirection(direction, right, down, left, up) {
    var horizontalDirection = false;
    var verticalDirection = false;
    if (direction === types_1.Direction.Start) {
        if (/[A-Z]|-|\+|x/.test(left)) {
            if (horizontalDirection === true) {
                throw new Error("Invalid map - Fork in path");
            }
            else {
            }
        }
    }
}
function startMoving(surroundingCells) {
    var pathDirection;
    var right = surroundingCells[0], down = surroundingCells[1], left = surroundingCells[2], up = surroundingCells[3];
    var cellValues = [right, down, left, up];
    var cellNames = new Map([
        [0, 'Right'],
        [1, 'Down'],
        [2, 'Left'],
        [3, 'Up'],
    ]);
    var definedValues = [];
    cellValues.forEach(function (value, index) {
        if (typeof value !== " ") {
            definedValues.push({ value: value, index: index });
        }
    });
    console.log("jesmo li došli ovdje?");
    if (definedValues.length === 1) {
        var definedValue = definedValues[0];
        var valueName = cellNames[definedValue.index];
        console.log("Definirana vrijednost: " + definedValue.value + ", Indeks: " + definedValue.index + ", Ime: " + valueName);
        pathDirection = eval("Direction." + valueName);
    }
    else {
        console.log("nekaj ne valja");
        console.log(definedValues.length);
    }
    return pathDirection;
}
function getSurroundingCells(map, row, column) {
    var right, down, left, up;
    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if (!(column >= (map[row].length - 1))) {
        right = map[row][column + 1];
    }
    if (!(row >= (map.length - 1))) {
        down = map[row + 1][column];
    }
    if (column !== 0) {
        left = map[row][column - 1];
    }
    if (row !== 0) {
        up = map[row - 1][column];
    }
    return [right, down, left, up];
}
function collectLettersAndFollowPath(map, startPosition) {
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var row = startPosition.row, column = startPosition.column;
    var pathDirection = types_1.Direction.Start;
    var endOfPath = null;
    var currentCell = "";
    var cellLeft = "";
    var cellRight = "";
    var cellAbove = "";
    var cellBellow = "";
    var newPosition = { row: row, column: column };
    while (endOfPath !== "x") {
        var surroundingCells = getSurroundingCells(map, row, column);
        var cellLeft_1 = surroundingCells[0], cellRight_1 = surroundingCells[1], cellAbove_1 = surroundingCells[2], cellBelow = surroundingCells[3];
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = startMoving(surroundingCells);
            /* ovdje želim znati u kojem smo smjeru krenuli (u funkciji startMoving ću bacati errore ako imamo fork ili broken path */
            if (cellRight_1 === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight_1);
            }
        }
        else {
            switch (pathDirection) {
                case "Right":
                    console.log("idemo desno");
                    endOfPath = "x";
                    break;
                case "Down":
                    console.log("idemo dole");
                    break;
                case "Left":
                    console.log("idemo dole");
                    break;
                case "Up":
                    console.log("idemo dole");
                    break;
            }
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
var map = maps.basicExample;
var startPosition = validate_1.validateMapAndFindStartingPosition(map);
if (startPosition !== undefined) {
    var output = collectLettersAndFollowPath(map, startPosition);
    console.log("Collected letters: " + output.letters);
    console.log("Path as characters: " + output.path);
}
