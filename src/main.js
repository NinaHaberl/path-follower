"use strict";
/**
 * Software Sauna Code Challenge: Follow a path of characters & collect letters
 *
 */
exports.__esModule = true;
var types_1 = require("../src/types");
var validBasicExample_1 = require("../maps/validBasicExample");
//import map from "../maps/invalidMissingStartCharacter";
//import map from "../maps/invalidMultipleStartsA";
//import map from "../maps/invalidMultipleStartsB";
//import map from "../maps/invalidMissingEndCharacter";
//import map from "../maps/invalidMissingStartAndStop";
function findStartingCharacterAndValidateOtherCharacters(map) {
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
    if (startPosition !== undefined) {
        return startPosition;
    }
    else {
        errorInvalidStartOrStopCharacter(startCharacter, stopCharacter);
    }
}
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
function setNewPosition(row, column, direction) {
    var newPosition;
    switch (direction) {
        case 1: // direction.Up
            row = row - 1;
            break;
        case 2: // direction.Down
            row = row + 1;
            break;
        case 3: // direction.Left
            column = column - 1;
            break;
        case 4: // direction.Right
            column = column + 1;
            break;
        default:
            break;
    }
    newPosition = { row: row, column: column };
    return newPosition;
}
function collectLettersAndFollowPath(map, startPosition) {
    var collectedLetters = [];
    var pathAsCharacters = ["@"];
    var row = startPosition.row, column = startPosition.column;
    var direction = types_1.Direction.Start;
    var endOfPath = null;
    var cellLeft = "";
    var cellRight = "";
    var cellAbove = "";
    var cellBellow = "";
    var newPosition = { row: row, column: column };
    while (endOfPath !== "x") {
        if (row === 0 && column === 0) {
            cellRight = map[row][column + 1];
            cellBellow = map[row + 1][column];
            if (cellRight === " " && cellBellow === " ") {
                throw new Error("Invalid map - Broken path after start character");
            }
            else if (/[A-Z]|-|\+|x/.test(cellRight) && /[A-Z]|-|\+|x/.test(cellBellow)) {
                throw new Error("Invalid map - Multiple directions after start character");
            }
            else if (cellRight === " " && /[A-Z]|-|\+|x/.test(cellBellow)) {
                direction = types_1.Direction.Down;
                pathAsCharacters.push(cellBellow);
                if (cellBellow === "x") {
                    endOfPath = "x";
                }
                newPosition = setNewPosition(row, column, direction);
            }
            else if (/[A-Z]|-|\+|x/.test(cellRight) && cellBellow === " ") {
                direction = types_1.Direction.Right;
                pathAsCharacters.push(cellRight);
                if (cellRight === "x") {
                    endOfPath = "x";
                }
                newPosition = setNewPosition(row, column, direction);
            }
            console.log("nova pozicija je [" + newPosition.row + "][" + newPosition.column + "]");
            endOfPath = "x";
        }
        else if (row === 0 && column > 0) {
        }
        else if (row > 0 && column === 0) {
            console.log("možemo ići gore, dolje i desno");
        }
        else if (row > 0 && column > 0) {
            console.log("možemo ići gore, dolje, desno i lijevo");
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
var startPosition = findStartingCharacterAndValidateOtherCharacters(validBasicExample_1["default"]);
if (startPosition !== undefined) {
    var output = collectLettersAndFollowPath(validBasicExample_1["default"], startPosition);
    console.log("Collected letters: " + output.letters);
    console.log("Path as characters: " + output.path);
}
/*if(startPosition) {
    for (const row of map) {
        console.log(row.join(''));
    }

} else {
    throw new Error("Oops, something went totally wrong...");
}


function findStartingCharacter(map: MapOfCharacters[][]): { column: number; row: number } | null | Error {

    let startingCharacterRow = -1;
    let startingCharacterColumn = -1;

    for(let row = 0; row < map.length; row++) {
        for(let column = 0; column < map[row].length; column++) {
            if(map[row][column] === "@") {

                if(startingCharacterRow !== -1 || startingCharacterColumn !== -1) {
                    throw new Error("Invalid map - Multiple starts: map contains more than one '@' character");
                }

                startingCharacterRow = row;
                startingCharacterColumn = column;

            }
        }
    }

    if(startingCharacterRow === -1 || startingCharacterColumn === -1) {
        throw new Error("Invalid map - Missing start character: map doesn't contain starting '@' character");
    }

    return {row: startingCharacterRow, column: startingCharacterColumn};
}*/
