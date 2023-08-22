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
        var _a = direction_1.getSurroundingCells(map, row, column), right = _a[0], down = _a[1], left = _a[2], up = _a[3];
        //[right, down, left, up] = surroundingCells;
        if (pathDirection === types_1.Direction.Start) {
            console.log("Desno je " + right);
            endOfPath = "x";
            pathDirection = direction_1.startMoving(right, down, left, up);
            console.log("Jel sada znamo u kojem smjeru idemo?" + pathDirection);
            console.log("a što ako ovako ispišem smijer? " + types_1.Direction.Right);
            /* ovdje želim znati u kojem smo smjeru krenuli (u funkciji startMoving ću bacati errore ako imamo fork ili broken path */
            if (cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        }
        else {
            switch (pathDirection) {
                case types_1.Direction.Right:
                    console.log("idemo desno");
                    endOfPath = "x";
                    break;
                case types_1.Direction.Down:
                    console.log("idemo dole");
                    break;
                case types_1.Direction.Left:
                    console.log("idemo dole");
                    break;
                case types_1.Direction.Up:
                    console.log("idemo dole");
                    break;
                default:
                    console.log("stop");
                    endOfPath = "x";
            }
        }
    }
    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
exports.collectLettersAndFollowPath = collectLettersAndFollowPath;
