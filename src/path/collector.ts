import {Direction, MapOfCharacters, Position} from "../types";
import {checkSurroundingCells, getNextCellValue, setNewPosition, setPathDirection} from "./direction";

export function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position): { letters: string, path: string } {

    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];

    let { row, column } = startPosition;
    let oldPosition: Position;
    let nextPosition: Position;
    let nextCharacter: MapOfCharacters;

    let pathDirection: Direction = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    while(endOfPath !== "x") {
        let [right, down, left, up] = checkSurroundingCells(map, row, column);

        if (pathDirection === Direction.Start) {

            // pathDirection === ENUM (0 = right; 1 = down ...)
            // Direction.Right === 0 (0 = right)
            pathDirection = setPathDirection(right, down, left, up);

        }
        nextCharacter = getNextCellValue(pathDirection, map, row, column);
        oldPosition = { row, column };
        nextPosition = setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;
        pathAsCharacters.push(nextCharacter);

        if(nextCharacter === "x") {
            endOfPath = "x";
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}