import {Direction, Position} from "../types";
import {checkSurroundingCells, getCurrentCellValue, makeTurn, setNewPosition, setPathDirection} from "./direction";

export function collectLettersAndFollowPath(map: string[][], startPosition: Position): {
    letters: string;
    path: string
} {

    // initialization of output fields
    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];

    const letterLocations: Map<string, [number, number]> = new Map();

    // initialization of path direction and positions
    let row: number = startPosition.row;
    let column: number = startPosition.column;
    let position = {row, column};
    let pathDirection: Direction = setPathDirection(map, row, column);

    const verticalRule: RegExp = /[A-Z]|\||\+|x/;
    const horizontalRule: RegExp = /[A-Z]|-|\+|x/;

    let nextPosition: Position;
    let currentCharacter: string;
    let endOfPath: string | null = null;

    // follow path
    while(endOfPath !== "x") {

        // set next position and surrounding cells;
        nextPosition = setNewPosition(pathDirection, position);
        row = nextPosition.row;
        column = nextPosition.column;

        currentCharacter = getCurrentCellValue(map, row, column);
        pathAsCharacters.push(currentCharacter);

        // validate path rules
        let [right, down, left, up] = checkSurroundingCells(map, row, column);
        let nextCell =
            pathDirection === Direction.Right ? right :
            pathDirection === Direction.Left ? left :
            pathDirection === Direction.Down ? down :
            pathDirection === Direction.Up ? up : undefined;

        let positionRules: Map<Direction, RegExp> = new Map([
            [Direction.Right, horizontalRule],
            [Direction.Left, horizontalRule],
            [Direction.Down, verticalRule],
            [Direction.Up, verticalRule]
        ]);

        let regexValidation: RegExp = positionRules.get(pathDirection);

        // broken path
        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        // collect letter | don't repeat from same location
        // letters may be found on turns
        if(/[A-Z]/.test(currentCharacter)) {
            if(updateLetterLocation(letterLocations, currentCharacter, row, column, collectedLetters)) {
                collectedLetters.push(currentCharacter);
            }

            console.log(`trenutna ćelija je ${currentCharacter}, sljedeća je ${nextCell}`);
            if(nextCell === " " || nextCell === undefined) {
                pathDirection = makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);
            }
        }

        // make turn
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

        // end of path
        if(currentCharacter === "x") {
            endOfPath = "x";
        }
    }

    return { letters: collectedLetters.join(""), path: pathAsCharacters.join("") };
}
function updateLetterLocation(
    letterLocations: Map<string, [number, number]>,
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