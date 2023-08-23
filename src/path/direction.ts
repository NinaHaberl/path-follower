import {Direction, MapOfCharacters, Position} from "../types";

export function setPathDirection(direction: Direction, right, down, left, up): Direction | Error {

    let horizontalDirection = false;
    let verticalDirection = false;

    if (direction === Direction.Start) {
        if(/[A-Z]|-|\+|x/.test(left)) {
            if(horizontalDirection === true) {
                throw new Error("Invalid map - Fork in path");

            } else {

            }
        }
    }
}

export function startMoving(right, down, left, up): number | Error {
    let pathDirection: Direction;
    const surroundingCells: MapOfCharacters[] = [right, down, left, up];
    let definedCell: Array<{ value: string; index: number; }> = [];

    surroundingCells.forEach((value, index) => {
        if(/[A-Z]|-|\||\+|x/.test(value)) {
            console.log(value);
            console.log(index);
            definedCell.push({value, index});
        }
    });

    if(definedCell.length === 0) {
        throw new Error("Invalid map: Broken path after @ character");

    } else if(definedCell.length === 1) {
        console.log(`Next position: ${definedCell[0].value}; direction: ${definedCell[0].index}`);
        pathDirection = definedCell[0].index;

    } else {
        console.log(definedCell.length);
    }

    return pathDirection;
}


export function checkSurroundingCells(map: MapOfCharacters[][], row: number, column: number): [MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined, MapOfCharacters | undefined] {

    let right:string | undefined, down:string | undefined, left:string | undefined, up:string | undefined;

    /**
     * Check map index: if index is out of bounds - return undefined
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

export function getNextCellValue(pathDirection, map, row, column): MapOfCharacters {

    let cellValue: MapOfCharacters = "";
    switch (pathDirection) {
        case Direction.Right:
            cellValue = setNextCellValue(map, row, column, 0, 1);
            break;
        case Direction.Down:
            cellValue = setNextCellValue(map, row, column, 1, 0);
            break;
        case Direction.Left:
            cellValue = setNextCellValue(map, row, column, 0, -1);
            break;
        case Direction.Up:
            cellValue = setNextCellValue(map, row, column, -1, 0);
            break;
    }

    return cellValue;
}

function setNextCellValue(map: MapOfCharacters[][], row: number, column: number, rowOffset: number, colOffset: number): MapOfCharacters {
    return map[row + rowOffset][column + colOffset];
}
