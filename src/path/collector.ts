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

        let [right, down, left, up] = getSurroundingCells(map, row, column);
        //[right, down, left, up] = surroundingCells;

        if (pathDirection === Direction.Start) {
            console.log(`Desno je ${right}`);
            endOfPath = "x";
            pathDirection = startMoving(right, down, left, up);

            console.log("Jel sada znamo u kojem smjeru idemo?" + pathDirection);
            console.log("a što ako ovako ispišem smijer? " + Direction.Right);

            /* ovdje želim znati u kojem smo smjeru krenuli (u funkciji startMoving ću bacati errore ako imamo fork ili broken path */

            if(cellRight === "x") {
                endOfPath = "x";
                pathAsCharacters.push(cellRight);
            }
        } else {
            switch (pathDirection) {
                case Direction.Right:
                    console.log("idemo desno");
                    endOfPath = "x";
                    break;
                case Direction.Down:
                    console.log("idemo dole");
                    break;
                case Direction.Left:
                    console.log("idemo dole");
                    break;
                case Direction.Up:
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