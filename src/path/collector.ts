import {Direction, Position} from "../types";
import {
    checkSurroundingCells, checkLShapedFork, checkTShapedFork,
    getCurrentCellValue,
    makeTurn,
    setNewPosition,
    getPathDirection,
} from "./direction";

export const collectLettersAndFollowPath = (map: string[][], startPosition: Position): {
    letters: string;
    path: string
} => {

    // initialization of output fields
    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];

    const letterLocations: Map<string, [number, number]> = new Map();

    // initialization of path direction and positions
    let row: number = startPosition.row;
    let column: number = startPosition.column;
    let position = {row, column};
    let pathDirection: Direction = getPathDirection(map, row, column);

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

        let regexValidation: RegExp | undefined = positionRules.get(pathDirection);

        // broken path
        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        if(/[A-Z]/.test(currentCharacter)) {
            // collect letter but don't repeat from same location
            if(updateLetterLocation(letterLocations, currentCharacter, row, column)) {
                collectedLetters.push(currentCharacter);
            }

            // letters may be found on turns
            if(nextCell === " " || nextCell === undefined) {
                checkTShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
                pathDirection = makeTurn(right, down, left, up, pathDirection, verticalRule, horizontalRule);

            }
        }

        // make turn
        if(currentCharacter === "+") {
             if((nextCell !== " " || nextCell !== undefined) && regexValidation!.test(nextCell!)) {
                 checkLShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
                 throw new Error("Invalid map: Fake turn");

             } else {
                 checkTShapedFork(pathDirection, verticalRule, horizontalRule, right, down, left, up);
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
const updateLetterLocation = (
    letterLocations: Map<string, [number, number]>,
    currentCharacter: string,
    row: number,
    column: number
): boolean => {
    const storedLocation = letterLocations.get(currentCharacter);
    const currentLocation = [row, column];
    let storageUpdate = false;

    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, [row, column]);
        storageUpdate = true;
    }
    return storageUpdate;
}
const letterLocationExists = (stored: [number, number], current: number[]) => {
    return JSON.stringify(stored) === JSON.stringify(current);
}