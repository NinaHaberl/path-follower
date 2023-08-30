import {Direction, Position} from "../types";
import {isHorizontalDirectionCharacterValid, isVerticalDirectionCharacterValid} from "../map/validate";

const setPathDirection = (start: boolean, direction: Direction): Direction => {
    if(!start) {
        return direction;

    } else {
        throw new Error("Invalid map: Multiple starting paths");
    }
}
export const getPathDirection = (map: string[][], row: number, column: number): number => {

    let pathDirection: number = -1;
    let [right, down, left, up] = checkSurroundingCells(map, row, column);
    let surroundingCells = [right, down, left, up];
    let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];

    // throw out empty cells
    surroundingCells.forEach((character, direction) => {
        if(character && /[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({character, direction});
        }
    });

    if(cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path after starting position");

    } else {
        if(cellsWithCharacters.length === 1) {
            pathDirection = cellsWithCharacters[0].direction;

        } else {

            let startDirection = false;

            cellsWithCharacters.forEach(cell => {
                const {character, direction} = cell;

                if(direction === Direction.Right || direction === Direction.Left) {
                    if(isHorizontalDirectionCharacterValid(character)) {
                        pathDirection = setPathDirection(startDirection, direction);
                        startDirection = true;
                    }

                } else if(direction === Direction.Up || direction === Direction.Down) {
                    if(isVerticalDirectionCharacterValid(character)) {
                        pathDirection = setPathDirection(startDirection, direction);
                        startDirection = true;
                    }
                }
            })
        }
    }

    return pathDirection;
}

export const setNewPosition = (direction: Direction, position: Position): Position => {

    switch (direction) {
        case Direction.Right:
            position.column = position.column + 1;
            break;
        case Direction.Down:
            position.row = position.row + 1;
            break;
        case Direction.Left:
            position.column = position.column - 1;
            break;
        case Direction.Up:
            position.row = position.row - 1;
            break;
    }

    return position;
}
export const setNextCellValue = (map: string[][], row: number, column: number, rowOffset: number, colOffset: number): string => {
    return map[row + rowOffset][column + colOffset];
}

export const getCurrentCellValue = (map: string[][], row: number, column: number): string => {
    return map[row][column];
}

export const makeTurn = (right: string | undefined, down: string | undefined, left: string | undefined, up: string | undefined, direction: Direction, verticalRule: RegExp, horizontalRule: RegExp): Direction => {

    if(direction === Direction.Right || direction === Direction.Left) {
        if (((up === " " || up === undefined) || /-/.test(up)) && verticalRule.test(down!)) {
            direction = Direction.Down;

        } else if (((down === " " || down === undefined) || /-/.test(down)) && verticalRule.test(up!)) {
            direction = Direction.Up;

        } else if ((down === " " || down === undefined) && (up === " " || up === undefined)) {
            throw new Error("Invalid map - Broken path after vertical turn");

        }

    } else if (direction === Direction.Up || direction === Direction.Down) {
        if (((right === " " || right === undefined) || /\|/.test(right)) && horizontalRule.test(left!)) {
            direction = Direction.Left;

        } else if(((left === " " || left === undefined) || /\|/.test(left)) && horizontalRule.test(right!)) {
            direction = Direction.Right;

        } else if ((right === " " || right === undefined) && (left === " " || left === undefined)) {
            throw new Error("Invalid map - Broken path after horizontal turn");

        }
    }

    return direction;
}

export const checkSurroundingCells = (map: string[][], row: number, column: number): [string | undefined, string | undefined, string | undefined, string | undefined] => {

    let right:string | undefined, down:string | undefined, left:string | undefined, up:string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if(!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);
    }

    if(!(row >= (map.length - 1))) {
        down = setNextCellValue(map, row, column, 1, 0);
    }

    if(column !== 0) {
        left = setNextCellValue(map, row, column, 0, -1);
    }

    if(row !== 0) {
        up = setNextCellValue(map, row, column, -1, 0);
    }

    return [right, down, left, up];
}

export const checkLShapedFork = (
    pathDirection: Direction,
    verticalRule: RegExp,
    horizontalRule: RegExp,
    right: string | undefined,
    down: string | undefined,
    left: string | undefined,
    up: string | undefined
) => {
    if ((pathDirection === Direction.Right || pathDirection === Direction.Left) &&
        (verticalRule.test(up!) || verticalRule.test(down!)) ||

        (pathDirection === Direction.Up || pathDirection === Direction.Down) &&
        (horizontalRule.test(right!) || horizontalRule.test(left!))) {

        throw new Error("Invalid map: Fork in path - L shaped fork");
    }
}

export const checkTShapedFork = (
    pathDirection: Direction,
    verticalRule: RegExp,
    horizontalRule: RegExp,
    right: string | undefined,
    down: string | undefined,
    left: string | undefined,
    up: string | undefined
) => {
    if((pathDirection === Direction.Right || pathDirection === Direction.Left) &&
        verticalRule.test(up!) && verticalRule.test(down!) ||

        (pathDirection === Direction.Up || pathDirection === Direction.Down) &&
        horizontalRule.test(right!) && horizontalRule.test(left!)) {

        throw new Error("Invalid map: Fork in path - T shaped fork");
    }
}


