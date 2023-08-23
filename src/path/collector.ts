import {Direction, MapOfCharacters, Position} from "../types";
import {checkSurroundingCells, getNextCellValue, startMoving} from "./direction";

export function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position): { letters: string, path: string } {

    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];

    let { row, column } = startPosition;
    let nextPosition: MapOfCharacters;

    let pathDirection: Direction | Error = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    while(endOfPath !== "x") {
        let [right, down, left, up] = checkSurroundingCells(map, row, column);

        if (pathDirection === Direction.Start) {

            // pathDirection === ENUM (0 = right; 1 = down ...)
            // Direction.Right === 0 (0 = right)
            pathDirection = startMoving(right, down, left, up);
            nextPosition = getNextCellValue(pathDirection, map, row, column);

            if(nextPosition === "x") {
                endOfPath = "x";
                pathAsCharacters.push(nextPosition);
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