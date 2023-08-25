import {Direction, MapOfCharacters, Position} from "../types";
import {checkSurroundingCells, getCurrentCellValue, makeTurn, setNewPosition, setPathDirection} from "./direction";

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
            //checking if the letter is on the turn
            [right, down, left, up] = checkSurroundingCells(map, row, column);

            if((pathDirection === Direction.Right && (right === " " || right === undefined)) ||
                (pathDirection === Direction.Left && (left === " " || left === undefined)) ||
                (pathDirection === Direction.Down && (down === " " || down === undefined)) ||
                (pathDirection === Direction.Up && (up === " " || up === undefined))) {

                pathDirection = makeTurn(right, down, left, up, pathDirection);
            }
        }

        // TODO: reduce code :P
        if(currentCharacter === "+") {
            [right, down, left, up] = checkSurroundingCells(map, row, column);

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