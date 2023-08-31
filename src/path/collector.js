"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
exports.getNextCell = function (pathDirection, right, left, down, up) {
    return pathDirection === types_1.Direction.Right ? right :
        pathDirection === types_1.Direction.Left ? left :
            pathDirection === types_1.Direction.Down ? down :
                pathDirection === types_1.Direction.Up ? up : undefined;
};
var verticalRule = /[A-Z]|\||\+|x/;
var horizontalRule = /[A-Z]|-|\+|x/;
var getPositionRules = function (horizontalRule, verticalRule) { return new Map([
    [types_1.Direction.Right, horizontalRule],
    [types_1.Direction.Left, horizontalRule],
    [types_1.Direction.Down, verticalRule],
    [types_1.Direction.Up, verticalRule]
]); };
var positionRules = getPositionRules(horizontalRule, verticalRule);
var isUppercase = function (currentCharacter) { return /[A-Z]/.test(currentCharacter); };
exports.collectLettersAndFollowPath = function (map, startPosition) {
    // initialization of output fields
    var letterLocations = new Map();
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var pathDirection = direction_1.getPathDirection(map, startPosition);
    var currentCharacter;
    var endOfPath = null;
    var position = startPosition;
    // follow path
    while (endOfPath !== "x") {
        position = direction_1.getNewPosition(pathDirection, position);
        currentCharacter = direction_1.getCurrentCellValue(map, position.row, position.column);
        pathAsCharacters.push(currentCharacter);
        // validate path rules
        var _a = direction_1.getSurroundingCells(map, position), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        var nextCell = exports.getNextCell(pathDirection, right, left, down, up);
        var regexValidation = positionRules.get(pathDirection);
        // broken path
        if (currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }
        if (isUppercase(currentCharacter)) {
            // collect letter but don't repeat from same location
            if (updateLetterLocation(letterLocations, currentCharacter, position)) {
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
var updateLetterLocation = function (letterLocations, currentCharacter, position) {
    var storedLocation = letterLocations.get(currentCharacter);
    var currentLocation = [position.row, position.column];
    var storageUpdate = false;
    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, [position.row, position.column]);
        storageUpdate = true;
    }
    return storageUpdate;
};
var letterLocationExists = function (stored, current) {
    return JSON.stringify(stored) === JSON.stringify(current);
};
