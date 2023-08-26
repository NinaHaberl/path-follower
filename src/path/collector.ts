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

    // follow path
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

        // validate path rules
        // after direction and surrounding cells setup
        [right, down, left, up] = checkSurroundingCells(map, row, column);
        let nextCell: MapOfCharacters =
            pathDirection === Direction.Right ? right :
            pathDirection === Direction.Left ? left :
            pathDirection === Direction.Down ? down :
            pathDirection === Direction.Up ? up : "";

        let positionRules: Map<Direction, RegExp> = new Map([
            [Direction.Right, /[A-Z]|-|\+|x/],
            [Direction.Left, /[A-Z]|-|\+|x/],
            [Direction.Down, /[A-Z]|\||\+|x/],
            [Direction.Up, /[A-Z]|\||\+|x/]
        ]);

        let directionValidation = positionRules.get(pathDirection);

        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        if(/[A-Z]/.test(currentCharacter)) {
            if(updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }

            if(nextCell === " " || nextCell === undefined) {
                pathDirection = makeTurn(right, down, left, up, pathDirection);
            }
        }

        if(currentCharacter === "+") {
            console.log(`Karakter je ${currentCharacter}, smijer je ${pathDirection}`);
            console.log(`Ćelija iznad je ${up}, ispod je ${down}`);
            console.log(`regex = ${directionValidation}; provjeravamo nextCell: ${nextCell}`);

            if(directionValidation.test(nextCell)) {

                const verticalRule: RegExp = /[A-Z]|\||\+|x/;
                const horizontalRule: RegExp = /[A-Z]|-|\+|x/;

                if(pathDirection === Direction.Right || pathDirection === Direction.Left) {
                    console.log("jesmo li ovdje?"); // forkInPathVerA ne radi :P
                    if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                } else if (pathDirection === Direction.Up || pathDirection === Direction.Down) {
                    if (/[A-Z]|-|\+|x/.test(right) || /[A-Z]|-|\+|x/.test(left)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }

                throw new Error("Invalid map: Fake turn");

            } else {
                if(pathDirection === Direction.Right || pathDirection === Direction.Left) {
                    console.log("jesmo li ovdje?"); // forkInPathVerA ne radi :P
                    if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                } else if (pathDirection === Direction.Up || pathDirection === Direction.Down) {
                    if (/[A-Z]|-|\+|x/.test(right) || /[A-Z]|-|\+|x/.test(left)) {
                        throw new Error("Invalid map: Fork in path");
                    }
                }
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