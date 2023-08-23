import {Direction, MapOfCharacters, Position} from "../types";

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

export function setPathDirection(map: MapOfCharacters[][], row: number, column: number, direction: number): number {

    let [right, down, left, up] = checkSurroundingCells(map, row, column);
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let cellsWithCharacters: Array<{ character: string; direction: number; }> = [];

    // collect the characters from all surrounding cells
    surroundingCells.forEach((character, direction) => {
        if(/[A-Z]|-|\||\+|x/.test(character)) {
            cellsWithCharacters.push({character, direction});
        }
    });

    if(cellsWithCharacters.length === 0) {
        throw new Error("Invalid map: Broken path");

    } else {
        if(cellsWithCharacters.length === 1) {
            direction = cellsWithCharacters[0].direction;

        } else {
            if(direction === Direction.Start) {
                /* TODO: think about edge cases of valid maps, for example

                 `
                    ++
                    @x
                 `,
                 `
                    +--A
                    |@-+
                    |
                    x
                 `
                  */

                throw new Error("Invalid map: Multiple starting paths");

            } else {
                if(direction === Direction.Right || direction === Direction.Left) {
                    if(!/[A-Z]|\||\+|x/.test(right)) {
                        throw new Error('Invalid map: Broken path - illegal character');
                    }
                }
                if(direction === Direction.Up || direction === Direction.Down) {
                    if(!/[A-Z]|\+|\|x/.test(up)) {
                        throw new Error('Invalid map: Broken path - illegal character');
                    }
                }

            }
        }
    }

    return direction;
}


export function checkSurroundingCells(map: MapOfCharacters[][], row: number, column: number): [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] {

    let right:string | undefined, down:string | undefined, left:string | undefined, up:string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
     * TODO: refactor [reduce code]
     */
    if(!(column >= (map[row].length - 1))) {
        right = setNextCellValue(map, row, column, 0, 1);;
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

export function getNextCellValue(pathDirection: Direction, map: MapOfCharacters[][], row: number, column: number): MapOfCharacters {

    let rowOffset: number = 0;
    let colOffset: number = 0;

    switch (pathDirection) {
        case Direction.Right:
            colOffset = 1;
            break;
        case Direction.Down:
            rowOffset = 1;
            break;
        case Direction.Left:
            colOffset = -1;
            break;
        case Direction.Up:
            rowOffset = -1
            break;
    }

    return setNextCellValue(map, row, column, rowOffset, colOffset);
}

function setNextCellValue(map: MapOfCharacters[][], row: number, column: number, rowOffset: number, colOffset: number): MapOfCharacters {
    return map[row + rowOffset][column + colOffset];
}
