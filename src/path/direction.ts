import {Direction, Position} from "../types";
import {isHorizontalDirectionCharacterValid, isVerticalDirectionCharacterValid} from "../map/validate";

const getCellsWithCharacters = (cells: (string | undefined)[]) => {
    let cellsWithCharacters: Array<{ character: string; direction: number }> = [];
    cells.forEach((character, direction) => {
        // throw out empty cells
        if (character && /[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({character, direction});
        }
    });
    return cellsWithCharacters;
};

const isHorizontalDirection = (c: {
    character: string;
    direction: number
}) => c.direction === Direction.Right || c.direction === Direction.Left;

const isVerticalDirection = (c: {
    character: string;
    direction: number
}) => c.direction === Direction.Up || c.direction === Direction.Down;

export const getPathDirection = (map: string[][], position: Position): Direction => {

    let surroundingCells = getSurroundingCells(map, position);

    let surroundingCellsWithCharacters: Array<{
        character: string;
        direction: number;
    }> = getCellsWithCharacters(surroundingCells);

    const validStartingPaths = surroundingCellsWithCharacters
        .filter(c =>
            (isHorizontalDirection(c) && isHorizontalDirectionCharacterValid(c.character)) ||
            (isVerticalDirection(c) && isVerticalDirectionCharacterValid(c.character))
        );

    if (validStartingPaths.length == 0) {
        throw new Error("Invalid map: Broken path after starting position");
    }

    if (validStartingPaths.length > 1) {
        throw new Error("Invalid map: Multiple starting paths");
    }

    return validStartingPaths[0].direction;
}

export const getNewPosition = (direction: Direction, position: Position): Position => {

    let row = position.row;
    let column = position.column;

    switch (direction) {
        case Direction.Right:
            column = column + 1;
            break;
        case Direction.Down:
            row = row + 1;
            break;
        case Direction.Left:
            column = column - 1;
            break;
        case Direction.Up:
            row = row - 1;
            break;
    }
    return {row, column};
}
export const setNextCellValue = (map: string[][], row: number, column: number, rowOffset: number, colOffset: number): string => {
    return map[row + rowOffset][column + colOffset];
}

export const getCurrentCellValue = (map: string[][], row: number, column: number): string => {
    return map[row][column];
}

export const makeTurn = (right: string | undefined, down: string | undefined, left: string | undefined, up: string | undefined, direction: Direction, verticalRule: RegExp, horizontalRule: RegExp): Direction => {

    if (direction === Direction.Right || direction === Direction.Left) {
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

        } else if (((left === " " || left === undefined) || /\|/.test(left)) && horizontalRule.test(right!)) {
            direction = Direction.Right;

        } else if ((right === " " || right === undefined) && (left === " " || left === undefined)) {
            throw new Error("Invalid map - Broken path after horizontal turn");

        }
    }

    return direction;
}

export const getSurroundingCells = (map: string[][], position: Position): [string | undefined, string | undefined, string | undefined, string | undefined] => {

    let row = position.row;
    let column = position.column;

    let right: string | undefined, down: string | undefined, left: string | undefined, up: string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
     */
    if (!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);
    }

    if (!(row >= (map.length - 1))) {
        down = setNextCellValue(map, row, column, 1, 0);
    }

    if (column !== 0) {
        left = setNextCellValue(map, row, column, 0, -1);
    }

    if (row !== 0) {
        up = setNextCellValue(map, row, column, -1, 0);
    }

    return [right, down, left, up];
}

export const checkLShapedFork = (pathDirection: Direction, verticalRule: RegExp, horizontalRule: RegExp, right: string | undefined, down: string | undefined, left: string | undefined, up: string | undefined) => {
    if ((pathDirection === Direction.Right || pathDirection === Direction.Left) && (verticalRule.test(up!) || verticalRule.test(down!)) ||

        (pathDirection === Direction.Up || pathDirection === Direction.Down) && (horizontalRule.test(right!) || horizontalRule.test(left!))) {

        throw new Error("Invalid map: Fork in path - L shaped fork");
    }
}

export const checkTShapedFork = (pathDirection: Direction, verticalRule: RegExp, horizontalRule: RegExp, right: string | undefined, down: string | undefined, left: string | undefined, up: string | undefined) => {
    if ((pathDirection === Direction.Right || pathDirection === Direction.Left) && verticalRule.test(up!) && verticalRule.test(down!) ||

        (pathDirection === Direction.Up || pathDirection === Direction.Down) && horizontalRule.test(right!) && horizontalRule.test(left!)) {

        throw new Error("Invalid map: Fork in path - T shaped fork");
    }
}


