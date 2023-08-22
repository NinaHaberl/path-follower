import {Direction, MapOfCharacters, Position} from "../types";
import {getSurroundingCells, startMoving} from "./direction";

export function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position): { letters: string, path: string } {

    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];
    let { row, column } = startPosition;
    let pathDirection: Direction | Error = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    let currentCell = "";
    let cellLeft = "";
    let cellRight = "";
    let cellAbove = "";
    let cellBellow = "";

    let newPosition: Position = { row, column };

    while(endOfPath !== "x") {

        let surroundingCells= getSurroundingCells(map, row, column);
        let [cellLeft, cellRight, cellAbove, cellBelow] = surroundingCells;

        if (pathDirection === Direction.Start) {
            pathDirection = startMoving(surroundingCells);

            /* ovdje želim znati u kojem smo smjeru krenuli (u funkciji startMoving ću bacati errore ako imamo fork ili broken path */

            if(cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        } else {
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