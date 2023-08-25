import {Direction, MapOfCharacters, Position} from "../types";
import {checkSurroundingCells, getCurrentCellValue, makeTurn, setNewPosition, setPathDirection} from "./direction";

export function collectLettersAndFollowPath(map: MapOfCharacters[][], startPosition: Position | undefined): {
    letters: string;
    path: string
} {

    // initialization of output fields
    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];
    const letterLocations: Map<string, [number, number]> = new Map();

    // initialization of path direction and positions
    let pathDirection: Direction = Direction.Start;
    let endOfPath: MapOfCharacters | null = null;

    let row = startPosition?.row;
    let column = startPosition?.column;
    let position, nextPosition: Position;
    let currentCharacter: MapOfCharacters;

    while(endOfPath !== "x") {

        // initialize current position and surrounding cells;
        position = { row, column };
        let [right, down, left, up]: MapOfCharacters | undefined = checkSurroundingCells(map, row, column);
        let surroundingCells: MapOfCharacters[] = [right, down, left, up];
        let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];

        // throw out empty cells
        surroundingCells.forEach((character, direction) => {
            if(/[A-Z]|-|\||\+|x/.test(character)) {
                cellsWithCharacters.push({character, direction});
            }
        });

        if(pathDirection === Direction.Start) {
            pathDirection = setPathDirection(cellsWithCharacters);
        }

        // set next position and surrounding cells;
        nextPosition = setNewPosition(pathDirection, position);
        row = nextPosition.row;
        column = nextPosition.column;

        currentCharacter = getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);

        [right, down, left, up] = checkSurroundingCells(map, row, column);

        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        // validate path rules
        if(/[A-Z]/.test(currentCharacter)) {

            if(updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }

            // TODO: reduce code;
            //checking if the letter is on the turn
            if((pathDirection === Direction.Right && (right === " " || right === undefined)) ||
                (pathDirection === Direction.Left && (left === " " || left === undefined)) ||
                (pathDirection === Direction.Down && (down === " " || down === undefined)) ||
                (pathDirection === Direction.Up && (up === " " || up === undefined))) {

                pathDirection = makeTurn(right, down, left, up, pathDirection);
            }
        }

        // TODO: reduce code :P
        if(currentCharacter === "+") {
            if((pathDirection === Direction.Right && /[A-Z]|-|\+|x/.test(right)) ||
                (pathDirection === Direction.Left && /[A-Z]|-|\+|x/.test(left)) ||
                (pathDirection === Direction.Down && /[A-Z]|\||\+|x/.test(down)) ||
                (pathDirection === Direction.Up && /[A-Z]|\||\+|x/.test(up))) {
                throw new Error("Invalid map: Fake turn");
            }

            pathDirection = makeTurn(right, down, left, up, pathDirection);
        }

        if(currentCharacter === "x") {
            endOfPath = "x";
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
function updateLetterLocation(
    letterLocations: Map<string, [number?, number?]>,
    currentCharacter: string,
    row: number,
    column: number
): boolean {
    const storedLocation = letterLocations.get(currentCharacter);
    const currentLocation = [row, column];
    let storageUpdate = false;

    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, currentLocation);
        storageUpdate = true;
    }
    return storageUpdate;
}
function letterLocationExists(stored, current) {
    return JSON.stringify(stored) === JSON.stringify(current);
}