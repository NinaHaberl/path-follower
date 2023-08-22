"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var direction_1 = require("./direction");
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
        var surroundingCells = direction_1.getSurroundingCells(map, row, column);
        var cellLeft_1 = surroundingCells[0], cellRight_1 = surroundingCells[1], cellAbove_1 = surroundingCells[2], cellBelow = surroundingCells[3];
        if (pathDirection === types_1.Direction.Start) {
            pathDirection = direction_1.startMoving(surroundingCells);
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
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
