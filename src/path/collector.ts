import {Direction, MapOfCharacters, Position} from "../types";
import {getCurrentCellValue, setNewPosition, setPathDirection, makeTurn} from "./direction";

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
    let currentCharacter: MapOfCharacters;

    while(endOfPath !== "x") {

        oldPosition = { row, column };
        if(pathDirection === Direction.Start) {
            pathDirection = setPathDirection(map, row, column, pathDirection);
        }

        nextPosition = setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;

        currentCharacter = getCurrentCellValue(map, row, column);

        pathAsCharacters.push(currentCharacter);

        if(/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code
            if(letterLocations.size !== 0 || !letterLocations.has(currentCharacter)) {
                letterLocations.set(currentCharacter, [row, column]);
                collectedLetters.push(currentCharacter);
            } else {
                let storedLocation = letterLocations.get(currentCharacter);
                let locationCheck = [row, column];

                if(!letterLocationExists(storedLocation, locationCheck)) {
                    letterLocations.set(currentCharacter, [row, column]);
                    collectedLetters.push(currentCharacter);
                }
            }
        }

        if(/\+/.test(currentCharacter)) {
            pathDirection = makeTurn(map, row, column, pathDirection);
        }

        if(currentCharacter === "x") {
            endOfPath = "x";
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}

function letterLocationExists(stored, collected) {
    return JSON.stringify(stored) === JSON.stringify(collected);
}