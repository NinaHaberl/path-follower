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

    const verticalRule: RegExp = /[A-Z]|\||\+|x/;
    const horizontalRule: RegExp = /[A-Z]|-|\+|x/;

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
        [right, down, left, up] = checkSurroundingCells(map, row, column);
        let nextCell: MapOfCharacters =
            pathDirection === Direction.Right ? right :
            pathDirection === Direction.Left ? left :
            pathDirection === Direction.Down ? down :
            pathDirection === Direction.Up;


        let positionRules: Map<Direction, RegExp> = new Map([
            [Direction.Right, horizontalRule],
            [Direction.Left, horizontalRule],
            [Direction.Down, verticalRule],
            [Direction.Up, verticalRule]
        ]);

        let regexValidation: RegExp = positionRules.get(pathDirection);

        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        if(/[A-Z]/.test(currentCharacter)) {
            if(updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }

            if(nextCell === " " || nextCell === undefined) {
                pathDirection = makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);
            }
        }

        if(currentCharacter === "+") {
             if((nextCell !== " " || nextCell !== undefined) && regexValidation.test(nextCell)) {
                 if ((pathDirection === Direction.Right || pathDirection === Direction.Left) &&
                     (verticalRule.test(up) || verticalRule.test(down)) ||

                     (pathDirection === Direction.Up || pathDirection === Direction.Down) &&
                     (horizontalRule.test(right) || horizontalRule.test(left))) {

                     throw new Error("Invalid map: Fork in path");
                 }
                throw new Error("Invalid map: Fake turn");

             } else {
                 if((pathDirection === Direction.Right || pathDirection === Direction.Left) &&
                     verticalRule.test(up) && verticalRule.test(down) ||

                     (pathDirection === Direction.Up || pathDirection === Direction.Down) &&
                     horizontalRule.test(right) && horizontalRule.test(left)) {

                     throw new Error("Invalid map: Fork in path");
                 }
                 pathDirection = makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);
             }
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