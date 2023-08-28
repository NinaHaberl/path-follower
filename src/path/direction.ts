import {Direction, string, Position} from "../types";

export function setPathDirection(cellsWithCharacters: Array<{ character: string; direction: number; }>): number {
    let direction: number;

    if(cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path after starting position");

    } else {
        if(cellsWithCharacters.length === 1) {
            direction = cellsWithCharacters[0].direction;

        } else {
            /* TODO: think about edge cases of valid maps, for example
            `
                 +--A
                 |@-+
                 |
                 x
             `
             */
            throw new Error("Invalid map: Multiple starting paths");
        }
    }

    return direction;
}

export function setNewPosition(direction: Direction, position: Position): Position {

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
export function checkSurroundingCells(map: string[][], row: number, column: number): [string | undefined, string | undefined, string | undefined, string | undefined] {

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

export function setNextCellValue(map: string[][], row: number, column: number, rowOffset: number, colOffset: number): string {
    return map[row + rowOffset][column + colOffset];
}

export function getCurrentCellValue(map: string[][], row: number, column: number): string {
    return map[row][column];
}

export function makeTurn(right: string, down: string, left: string, up: string, direction: Direction, verticalRule: RegExp, horizontalRule: RegExp): Direction {

    if(direction === Direction.Right || direction === Direction.Left) {
        if ((up === " " || up === undefined) && verticalRule.test(down)) {
            direction = Direction.Down;

        } else if ((down === " " || down === undefined) && verticalRule.test(up)) {
            direction = Direction.Up;

        } else if ((down === " " || down === undefined) && (up === " " || up === undefined)) {
            throw new Error("Invalid map - Broken path after vertical turn");
        }

    } else if (direction === Direction.Up || direction === Direction.Down) {
        if ((right === " " || right === undefined) && horizontalRule.test(left)) {
            direction = Direction.Left;

        } else if((left === " " || left === undefined) && horizontalRule.test(right)) {
            direction = Direction.Right;

        } else if ((right === " " || right === undefined) && (left === " " || left === undefined)) {
            throw new Error("Invalid map - Broken path after horizontal turn");
        }
    }

    return direction;
}


