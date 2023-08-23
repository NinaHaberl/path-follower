import {Direction, MapOfCharacters, Position} from "../types";
import {getNextCellValue, setNewPosition, setPathDirection} from "./direction";

export function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position | undefined): {
    letters: string;
    path: string
} {

    // initialization of output fields
    const letterLocations = new Map();
    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];

    // initialization of path direction and positions
    let pathDirection: Direction = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    let row = startPosition?.row;
    let column = startPosition?.column;
    let oldPosition, nextPosition: Position;
    let nextCharacter: MapOfCharacters;

    while(endOfPath !== "x") {

        oldPosition = { row, column };
        if(pathDirection === Direction.Start) {
            pathDirection = setPathDirection(map, row, column, pathDirection);
        }

        nextCharacter = getNextCellValue(pathDirection, map, row, column);
        nextPosition = setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;

        pathAsCharacters.push(nextCharacter);

        if(/[A-Z]/.test(nextCharacter)) {
            // TODO: reduce code
            if(letterLocations.size !== 0 || !letterLocations.has(nextCharacter)) {
                letterLocations.set(nextCharacter, [row, column]);
                collectedLetters.push(nextCharacter);
            } else {
                let storedLocation = letterLocations.get(nextCharacter);
                let locationCheck = [row, column];

                if(!letterLocationExists(storedLocation, locationCheck)) {
                    letterLocations.set(nextCharacter, [row, column]);
                    collectedLetters.push(nextCharacter);
                }
            }
        }

        if(nextCharacter === "x") {
            endOfPath = "x";
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}

function letterLocationExists(stored, collected) {
    return JSON.stringify(stored) === JSON.stringify(collected);
}