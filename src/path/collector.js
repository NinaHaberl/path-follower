"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
exports.collectLettersAndFollowPath = function (map, startPosition) {
    // initialization of output fields
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var letterLocations = new Map();
    // initialization of path direction and positions
    var row = startPosition.row;
    var column = startPosition.column;
    var position = { row: row, column: column };
    var pathDirection = direction_1.getPathDirection(map, row, column);
    var verticalRule = /[A-Z]|\||\+|x/;
    var horizontalRule = /[A-Z]|-|\+|x/;
    var nextPosition;
    var currentCharacter;
    var endOfPath = null;
    // follow path
    while (endOfPath !== "x") {
        // set next position and surrounding cells;
        nextPosition = direction_1.setNewPosition(pathDirection, position);
        row = nextPosition.row;
        column = nextPosition.column;
        currentCharacter = direction_1.getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);
        // validate path rules
        var _a = direction_1.checkSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        var nextCell = pathDirection === types_1.Direction.Right ? right :
            pathDirection === types_1.Direction.Left ? left :
                pathDirection === types_1.Direction.Down ? down :
                    pathDirection === types_1.Direction.Up ? up : undefined;
        var positionRules = new Map([
            [types_1.Direction.Right, horizontalRule],
            [types_1.Direction.Left, horizontalRule],
            [types_1.Direction.Down, verticalRule],
            [types_1.Direction.Up, verticalRule]
        ]);
        var regexValidation = positionRules.get(pathDirection);
        // broken path
        if (currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }
        if (/[A-Z]/.test(currentCharacter)) {
            // collect letter but don't repeat from same location
            if (updateLetterLocation(letterLocations, currentCharacter, row, column)) {
                collectedLetters.push(currentCharacter);
            }
            // letters may be found on turns
            if (nextCell === " " || nextCell === undefined) {
                direction_1.checkTShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
                pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);
            }
        }
        // make turn
        if (currentCharacter === "+") {
            if ((nextCell !== " " || nextCell !== undefined) && regexValidation.test(nextCell)) {
                direction_1.checkLShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
                throw new Error("Invalid map: Fake turn");
            }
            else {
                direction_1.checkTShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
                pathDirection = direction_1.makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);
            }
        }
        // end of path
        if (currentCharacter === "x") {
            endOfPath = "x";
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
};
var updateLetterLocation = function (letterLocations, currentCharacter, row, column) {
    var storedLocation = letterLocations.get(currentCharacter);
    var currentLocation = [row, column];
    var storageUpdate = false;
    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, [row, column]);
        storageUpdate = true;
    }
    return storageUpdate;
};
var letterLocationExists = function (stored, current) {
    return JSON.stringify(stored) === JSON.stringify(current);
};
