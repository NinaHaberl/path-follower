import {Direction, Position} from "../types";
import {
    getSurroundingCells, checkLShapedFork, checkTShapedFork,
    getCurrentCellValue,
    makeTurn,
    getNewPosition,
    getPathDirection,
} from "./direction";


const getNextCell = (pathDirection: Direction | Direction.Down | Direction.Left | Direction.Up | Direction.Start, right: string | undefined, left: string | undefined, down: string | undefined, up: string | undefined) => pathDirection === Direction.Right ? right :
    pathDirection === Direction.Left ? left :
        pathDirection === Direction.Down ? down :
            pathDirection === Direction.Up ? up : undefined;


const verticalRule: RegExp = /[A-Z]|\||\+|x/;
const horizontalRule: RegExp = /[A-Z]|-|\+|x/;
const getPositionRules = (horizontalRule: RegExp, verticalRule: RegExp) => new Map([
    [Direction.Right, horizontalRule],
    [Direction.Left, horizontalRule],
    [Direction.Down, verticalRule],
    [Direction.Up, verticalRule]
]);
const positionRules: Map<Direction, RegExp> = getPositionRules(horizontalRule, verticalRule);

const isUppercase = (currentCharacter: string) => /[A-Z]/.test(currentCharacter);

export const collectLettersAndFollowPath = (map: string[][], startPosition: Position): {
    letters: string;
    path: string
} => {

    // initialization of output fields
    const letterLocations: Map<string, [number, number]> = new Map();
    let collectedLetters: string[] = [];
    let pathAsCharacters: string[] = ["@"];
    let pathDirection: Direction = getPathDirection(map, startPosition);

    let currentCharacter: string;
    let endOfPath: string | null = null;
    let position: Position = startPosition;
    // follow path
    while(endOfPath !== "x") {

        position = getNewPosition(pathDirection, position);

        currentCharacter = getCurrentCellValue(map, position.row, position.column);
        pathAsCharacters.push(currentCharacter);

        // validate path rules
        let [right, down, left, up] = getSurroundingCells(map, position);
        let nextCell = getNextCell(pathDirection, right, left, down, up);

        let regexValidation: RegExp | undefined = positionRules.get(pathDirection);

        // broken path
        if(currentCharacter === " ") {
            throw new Error("Invalid map: Broken path");
        }

        if(isUppercase(currentCharacter)) {
            // collect letter but don't repeat from same location
            if(updateLetterLocation(letterLocations, currentCharacter, position)) {
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
    position: Position
): boolean => {
    const storedLocation = letterLocations.get(currentCharacter);
    const currentLocation = [position.row, position.column];
    let storageUpdate = false;

    if (!storedLocation || !letterLocationExists(storedLocation, currentLocation)) {
        letterLocations.set(currentCharacter, [position.row, position.column]);
        storageUpdate = true;
    }
    return storageUpdate;
}
const letterLocationExists = (stored: [number, number], current: number[]) => {
    return JSON.stringify(stored) === JSON.stringify(current);
}