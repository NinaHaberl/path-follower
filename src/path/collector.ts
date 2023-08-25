import {Direction, MapOfCharacters, Position} from "../types";
import {checkSurroundingCells, getCurrentCellValue, setNewPosition, setPathDirection} from "./direction";

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
    let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];

    let row = startPosition?.row;
    let column = startPosition?.column;
    let oldPosition, nextPosition: Position;
    let currentCharacter: MapOfCharacters;

    while(endOfPath !== "x") {

        oldPosition = { row, column };

        let [right, down, left, up] = checkSurroundingCells(map, row, column);
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

        nextPosition = setNewPosition(pathDirection, oldPosition);
        row = nextPosition.row;
        column = nextPosition.column;

        currentCharacter = getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);

        if(/[A-Z]/.test(currentCharacter)) {
            // TODO: reduce code;
            if(letterLocations.size !== 0 && !letterLocations.has(currentCharacter)) {
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

        // TODO: reduce code :P
        if(currentCharacter === "+") {
            [right, down, left, up] = checkSurroundingCells(map, row, column);
            surroundingCells = [right, down, left, up];

            if((pathDirection === Direction.Right && /[A-Z]|-|\+|x/.test(right)) ||
                (pathDirection === Direction.Left && /[A-Z]|-|\+|x/.test(left)) ||
                (pathDirection === Direction.Down && /[A-Z]|\||\+|x/.test(down)) ||
                (pathDirection === Direction.Up && /[A-Z]|\||\+|x/.test(up))) {
                throw new Error("Invalid map: Fake turn");
            }

            if(pathDirection === Direction.Right || pathDirection === Direction.Left) {

                if (/[A-Z]|\||\+|x/.test(up) && /[A-Z]|\||\+|x/.test(down)) {
                    throw new Error("Invalid map: Fork in path");

                } else {
                    if ((up === " " || up === undefined) && /[A-Z]|\||\+|x/.test(down)) {
                        pathDirection = Direction.Down;

                    } else {
                        pathDirection = Direction.Up;
                    }
                }

            } else if (pathDirection === Direction.Up || pathDirection === Direction.Down) {
                if (/[A-Z]|-|\+|x/.test(right) && /[A-Z]|-|\+|x/.test(left)) {
                    throw new Error("Invalid map: Fork in path");
                } else {
                    if ((right === " " || right === undefined) && /[A-Z]|-|\+|x/.test(left)) {
                        pathDirection = Direction.Left;
                    } else {
                        pathDirection = Direction.Right;
                    }
                }
            }
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

function getCellsWithCharacters(map: MapOfCharacters[][], row: number, column: number): Array<{ character: string; direction: number; }> {

    const [right, down, left, up] = checkSurroundingCells(map, row, column);
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let cells: Array<{ character: string; direction: number; }> = [];

    // throw out empty cells
    surroundingCells.forEach((character, direction) => {
        if(/[A-Z]|-|\||\+|x/.test(character)) {
            cells.push({character, direction});
        }
    });

    return cells;
}